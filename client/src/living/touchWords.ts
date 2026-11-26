/**
 * The painting tips are written for a mouse ("커서를 대면…"). On a touch screen the same
 * effects follow your finger, so say so, fixing the Korean particle that follows the word.
 * The wording in the gallery file stays as written (the manager page edits it once for both).
 */
const SWAPS: [RegExp, string][] = [
  [/커서를 (움직이면|움직여)/g, '손가락으로 그림을 쓸면'],
  [/커서를 (빠르게|천천히|크게)/g, '손가락으로 $1'],
  [/커서를/g, '손가락을'], [/커서가/g, '손가락이'], [/커서로/g, '손가락으로'],
  [/커서는/g, '손가락은'], [/커서와/g, '손가락과'], [/커서/g, '손가락'],
];
export const forTouch = (text: string) => SWAPS.reduce((t, [re, to]) => t.replace(re, to), text);
/** True on phones and tablets (no hovering pointer). */
export const touchFirst = () => typeof matchMedia === 'function' && matchMedia('(hover: none) and (pointer: coarse)').matches;
