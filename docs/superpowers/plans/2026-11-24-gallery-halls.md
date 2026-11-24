# 전시장 관 관리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The manager page can add, remove, rename, reorder and restyle the gallery's halls, and the 3D gallery (server and client) is built from that list.

**Architecture:** One data file `shared/src/gallery.json` = `{ halls, items }`. A pure function in `shared` turns halls + how many paintings each shows into a layout (hall spans, walls, painting slots, furniture, spots) and a `WorldMap`; the server, the client and the demo all build from it. Saving stays: manager page → GitHub commit → Render redeploy.

**Tech Stack:** TypeScript, three.js, Colyseus 0.18, Express, Vitest 4, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-24-gallery-halls-design.md`

## Global Constraints

- Halls: 1–12 (`MAX_HALLS = 12`). Paintings shown per hall: 0–8 (`HALL_MAX = 8`).
- Hall width: 12 m when it shows ≤ 5 paintings, 15 m for 6–8. Lobby: 12 m, always first, not editable.
- Hall fields: `id` (existing: garden/face/toy/pond; new: `h` + 6 random [a-z0-9]), `name` 1–12 chars, `color` one of 8 `HALL_COLORS` keys, `note` ≤ 80 chars, `motion` one of `HALL_MOTIONS` keys.
- Existing colors keep their exact hex: moss `#4a5a43`, crimson `#6b2727`, navy `#28324f`, teal `#22434a`.
- A hall can be deleted only when no painting (hidden included) points to it.
- Server must always start: an invalid gallery file falls back to the four default halls and logs why.
- Old file shape (a bare array of items) is still read, with the four default halls added.
- Garden, face and toy halls must be built exactly where they are now; pond (7 paintings) widens to 15 m.
- All user-facing text in Korean.

## Review Focus

1. A painting points to a hall that was deleted in the same edit → the save is refused with a clear message, nothing is lost (Task 1 test `refuses items in a missing hall`).
2. Building with 12 halls × 8 paintings: every painting's viewing spot is walkable and reachable from the lobby (Task 2 test `every viewing spot is reachable`).
3. The manager page moves the last painting out of a hall, then deletes the hall, then saves — one commit, file valid (Task 4 Playwright step).
4. A guest is standing far down the hall when the redeploy happens with fewer halls → they reconnect inside bounds (Task 2 test `spawn and snap stay inside the new bounds`: `nearestWalkable` of an out-of-bounds point is inside).
5. Hall name changed but id kept → paintings, likes and the viewer's hall intro still match (Task 3 test `viewer halls follow the gallery file`).

---

### Task 1: One gallery file with halls (no visible change)

**Files:**
- Move: `client/src/world/gallery.json` → `shared/src/gallery.json` (shape `{ halls, items }`)
- Modify: `shared/src/gallery.ts`, `shared/src/index.ts` (export JSON-backed `GALLERY`)
- Modify: `server/src/galleryStore.ts` (`GALLERY_JSON = 'shared/src/gallery.json'`; load/save `{ halls, items }`)
- Modify: `client/src/world/art.ts`, `client/src/living/answers.ts`, `client/src/living/viewer.js` (read `GALLERY.items`, `GALLERY.halls`)
- Modify: `server/src/adminGallery.js` (load/save the new shape; room picker from `halls`)
- Test: `shared/test/board.test.ts`, `server/test/gallery.test.ts`

**Interfaces:**
- Produces:
  - `interface Hall { id: string; name: string; color: HallColor; note: string; motion: HallMotion }`
  - `HALL_COLORS: Record<HallColor, string>` (8 keys: moss, crimson, navy, teal, plum, ochre, slate, umber)
  - `HALL_MOTIONS: Record<HallMotion, { label: string; sway: number; breath: number; ripple: number; sheen: number }>` — keys wind / breath / glint / water / still, values copied from today's `livingWall.MOTION` (garden=wind, face=breath, toy=glint, pond=water); still = lobby values.
  - `DEFAULT_HALLS: Hall[]` (the four of today, notes from viewer.js `ROOMS`)
  - `interface Gallery { halls: Hall[]; items: GalleryItem[] }`; `GalleryItem.room: string`
  - `checkGallery(raw: unknown): { ok: true; gallery: Gallery } | { ok: false; error: string }`
  - `newHallId(rand?: () => number): string`
  - `GALLERY: Gallery` (checked at import; on failure `{ halls: DEFAULT_HALLS, items: [] }` + `console.error`)
  - `shownIn(g: Gallery, hallId: string): number`

- [ ] **Step 1: Write failing tests** in `shared/test/board.test.ts`:
  - `the gallery file passes its own check` — `checkGallery(GALLERY_FILE)` ok and equal.
  - `reads the old array shape with the four default halls` — `checkGallery(items)` → `gallery.halls` equals `DEFAULT_HALLS`.
  - `refuses items in a missing hall` — item with `room: 'nope'` → error contains `전시실`.
  - `refuses a ninth painting in one hall` — error contains `8점`.
  - `hall rules` — duplicate id, empty name, 13-char name, unknown color, 13 halls → each `ok: false`.
  - `newHallId` matches `/^h[a-z0-9]{6}$/` and differs from existing ids.
- [ ] **Step 2: Run** `npx vitest run shared/test/board.test.ts` → FAIL.
- [ ] **Step 3: Implement** in `shared/src/gallery.ts`; move the JSON with `{ halls: DEFAULT_HALLS, items }`.
- [ ] **Step 4: Update consumers** (art.ts, answers.ts, viewer.js, galleryStore, adminGallery.js, server test fixture) to the new shape. `ROOM_INFO` colors/notes now come from `halls`. Viewer's `ROOMS` list = `GALLERY.halls`.
- [ ] **Step 5: Run** `npx vitest run && npx tsc -p client --noEmit && npx tsc -p server --noEmit && npx tsc -p shared --noEmit` → all pass.
- [ ] **Step 6: Playwright** — demo build gallery looks the same as before (screenshot lobby → pond, compare by eye); admin 전시장 tab loads, edit + save against fake GitHub writes `shared/src/gallery.json`.
- [ ] **Step 7: Commit** `Gallery file moves to shared and lists its halls`.

### Task 2: Build the gallery from its halls (shared)

**Files:**
- Create: `shared/src/galleryLayout.ts`
- Modify: `shared/src/world.ts` (gallery section uses the layout; `GALLERY_MAP` built from `GALLERY`)
- Test: `shared/test/galleryLayout.test.ts`, `shared/test/world.test.ts`

**Interfaces:**
- Consumes: `Hall`, `Gallery`, `GALLERY`, `shownIn`.
- Produces:
  - `interface Slot { x: number; y: number; z: number; face: { x: number; z: number }; maxW: number; maxH: number }` (moved from client art.ts)
  - `interface HallSpan { hall: Hall | null /* null = lobby */; x0: number; x1: number; slots: Slot[] }`
  - `interface GalleryLayout { spans: HallSpan[]; bounds: Rect; partitions: number[]; benches: Rect[]; tables: Furniture[]; plants: Furniture[]; map: WorldMap }`
  - `buildGalleryLayout(halls: Hall[], counts: Record<string, number>): GalleryLayout`
  - `hallWidth(count: number): 12 | 15`
  - `GALLERY_LAYOUT = buildGalleryLayout(GALLERY.halls, counts of GALLERY)`; `GALLERY_MAP = GALLERY_LAYOUT.map`; `WORLD = GALLERY_LAYOUT.bounds`
  - Removed: `ROOM_IDS`, `RoomId`, `PARTITIONS`, `BENCHES`, `TABLES`, `PLANTS` (replaced by layout fields). `ROOM_W`, `ROOM_D`, `BAR`, `DOOR_HALF`, `SPAWN` stay.

Slot rules (from the spec table): back wall first, then left wall, then right wall. 1–3 on 12 m use x0 + 2.4 / 6 / 9.6 (1 → centre, 2 → 3.6 / 8.4); 4 = 3 back + left; 5 = 3 back + left + right; 6–8 on 15 m: back 4/5/6 spread evenly (`x0 + w*(k+0.5)/n`), `maxW = min(2.6, spacing − 0.3)`, plus left + right. Side slot = today's `side(wallX, toward)`; the right wall of the last hall is the end wall. Benches at hall centre (x ± 1.4), tables at x0 + 2.2 and x1 − 2.2, plants in back corners whose side wall has no painting, spots in front of each slot (z −2.6 for back, 1.2 m out for side), seats as today.

- [ ] **Step 1: Write failing tests** in `shared/test/galleryLayout.test.ts`:
  - `today's garden, face and toy halls are built where they are now` — layout of `DEFAULT_HALLS` with counts {garden:5, face:4, toy:3, pond:7}: spans x 12–24, 24–36, 36–48; slot positions of those three halls equal the old `slotsFor` values (copy the old numbers into the test); benches, tables equal the old values for those halls.
  - `pond widens to 15 m with 7 paintings` — pond span 48–63, bounds.x1 63, 7 slots.
  - `hallWidth` — 0..5 → 12, 6..8 → 15.
  - `slots never overlap and stay on the walls` — for halls 1..12 and counts 0..8 (random seeded combos, 200 runs): every slot within its span, paintings at max size don't overlap (back-wall slots spaced ≥ maxW).
  - `every viewing spot is reachable` — for 12 halls × 8: `findPath(SPAWN, spot)` succeeds for every spot.
  - `spawn and snap stay inside the new bounds` — `nearestWalkable({x: 500, z: 0}, map)` has x < bounds.x1.
  - `empty hall still has a doorway and a bench`.
- [ ] **Step 2: Run** `npx vitest run shared` → FAIL.
- [ ] **Step 3: Implement** `buildGalleryLayout`, rewire `world.ts`.
- [ ] **Step 4: Run** all tests + tsc for shared and server → PASS (server builds rooms with the new `GALLERY_MAP` unchanged in code).
- [ ] **Step 5: Commit** `Gallery is built from its list of halls`.

### Task 3: Client builds what the layout says

**Files:**
- Modify: `client/src/world/gallery.ts`, `client/src/world/decor.ts`, `client/src/world/livingWall.ts`, `client/src/world/art.ts`, `client/src/living/viewer.js`
- Test: `client/test/painting-sizes.test.ts`, `client/test/docent.test.ts`, new `client/test/halls.test.ts`

**Interfaces:**
- Consumes: `GALLERY_LAYOUT`, `HALL_COLORS`, `HALL_MOTIONS`, `Slot` from shared.
- Produces: `livingCanvas(motion: HallMotion | 'still', seed: number)`; art.ts `slotsFor(hallId: string): Slot[]` = layout span slots.

- [ ] **Step 1: Write failing tests** in `client/test/halls.test.ts`:
  - `viewer halls follow the gallery file` — viewer room list ids/names = `GALLERY.halls`.
  - `every shown painting has a slot` — for each hall, `ART` count ≤ `slotsFor(id).length`.
  - painting-sizes / docent tests rewritten against the layout (no `GALLERY_SLOTS`).
- [ ] **Step 2: Run** client tests → FAIL.
- [ ] **Step 3: Implement**: walls, fabric color, name plates, light strands, runner, floor size, benches, plants, paintings loop over `GALLERY_LAYOUT.spans`; empty hall shows a plate "곧 그림이 걸릴 방이에요" under the name.
- [ ] **Step 4: Run** all tests + tsc → PASS.
- [ ] **Step 5: Playwright** — (a) today's file: screenshots of each hall, compare with before; (b) a test file with 6 halls (one empty, one with 8): walk lobby → end on desktop 1280×800 and phone 390×844, screenshots; no page errors.
- [ ] **Step 6: Commit** `3D gallery follows the halls list`.

### Task 4: Manager page — 관 section

**Files:**
- Modify: `server/src/adminGallery.js`, `server/src/adminPage.ts` (CSS)
- Test: `server/test/gallery.test.ts` (save with hall changes), Playwright script

**Interfaces:**
- Consumes: PUT `/admin/api/gallery` body `{ gallery: { halls, items }, pictures, version, summary }`; GET returns `{ gallery, version, canSave, … }` (from Task 1).

- [ ] **Step 1: Write failing server test** `saves hall changes in one commit` — PUT with a new hall + a painting moved into it → one commit, file has 5 halls.
- [ ] **Step 2: Run** → FAIL (if Task 1 already covers the shape, this passes; then only add the assertion on the commit message containing the hall summary).
- [ ] **Step 3: Implement UI** — section above the rooms: per hall swatch, name, `N / 8점`, ↑ ↓, 고치기 (name, 8 color dots, motion select, note), 지우기 (disabled with reason when it holds paintings), "Ⅱ관 만들기" on full halls (next free roman numeral, copy color/motion/note, insert after), "+ 새 관". Room picker in the painting editor lists halls, full ones disabled. Changes count toward the save bar; summary lists hall changes (`새 관 "…"`, `「…」 이름 변경`, `「…」 지움`).
- [ ] **Step 4: Playwright against fake GitHub** — new hall → move a painting in → Ⅱ관 from a full hall → move last painting out of a hall → delete it → save → committed file passes `checkGallery`, has the expected halls.
- [ ] **Step 5: Run** all tests → PASS. **Commit** `Manager page: halls can be added, renamed, restyled, reordered and removed`.

### Task 5: Ship

- [ ] **Step 1:** Push; confirm Render deploy hash = local `client/dist` hash.
- [ ] **Step 2:** Rebuild demo, republish the artifact.
- [ ] **Step 3:** Update the design doc's status and the project doc (`claude/web-party-design.md`) with the halls feature.
