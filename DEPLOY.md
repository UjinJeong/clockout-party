# 무료로 서버 올리기

이 프로젝트는 **서버 하나**가 웹 화면과 게임을 같이 내보내요. 그래서 한 곳에만 올리면 돼요.
마이크(음성 메시지)는 `https://` 주소에서만 동작하니, 아래 방법은 모두 https 주소가 생기도록 정리했어요.

```
🆓 무료로 올리는 방법 3가지
├─ 1. Render 무료 (추천: 제일 쉬움, 테스트용)
│   ├─ 깃허브에 올리고 클릭 몇 번이면 끝, https 주소 자동
│   ├─ 15분 동안 아무도 없으면 잠듦 → 다음 손님은 약 1분 기다림
│   ├─ 한 달 750시간 무료 (서버 1개를 한 달 내내 켜 둘 수 있는 양)
│   └─ 잠들 때 방문 기록이 지워짐 (무료 플랜은 저장 공간 없음)
├─ 2. Oracle Cloud 평생 무료 서버 (오래 운영할 때)
│   ├─ 서울 지역 선택 가능 → 한국에서 빠름, 항상 켜져 있음
│   ├─ Arm 서버 2코어 · 메모리 12GB 무료, 방문 기록도 계속 남음
│   └─ 직접 리눅스 서버를 다뤄야 해서 설정이 어려움
└─ 3. 내 PC + Cloudflare Tunnel (오늘 바로 친구랑 테스트)
    ├─ 내 컴퓨터가 서버, 무료 https 주소가 생김
    └─ 컴퓨터를 끄면 파티도 닫힘
```

---

## 1. Render 무료로 올리기

1. 이 프로젝트를 GitHub 저장소에 올려요. (GitLab도 연결 가능)
2. [render.com](https://render.com)에 가입하고 **New → Blueprint**를 눌러요.
3. 저장소를 고르면 `render.yaml`을 읽어서 자동으로 설정돼요. (무료 플랜, 싱가포르 지역)
4. 배포가 끝나면 `https://clockout-party.onrender.com` 같은 주소가 생겨요. 이 주소를 친구에게 보내면 끝이에요.
5. 관리 페이지: `주소/admin`. 비밀번호는 Render 대시보드 → 서비스 → **Environment**의 `ADMIN_PASSWORD`에서 확인해요.

> 지역 선택에서 싱가포르가 안 되면 대시보드에서 다른 지역을 고르세요. 한국에서는 싱가포르가 가장 가까워요.

## 2. Oracle Cloud 평생 무료 서버

1. [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)에 가입해요. **홈 리전을 "South Korea Central (Seoul)"로** 고르세요.
   무료 서버는 홈 리전에만 만들 수 있고, 춘천 리전은 Arm 무료 서버가 안 돼요.
2. **Compute → Instances → Create**: 이미지 Ubuntu, 모양 `VM.Standard.A1.Flex`(Ampere), 2 OCPU / 12GB 이하.
   "Out of host capacity"가 나오면 잠시 뒤 다시 시도하거나 다른 가용 영역을 골라요.
3. 서버에 접속해서 Docker를 설치하고 이 프로젝트를 받아요.
   ```bash
   curl -fsSL https://get.docker.com | sh
   git clone https://github.com/UjinJeong/clockout-party.git && cd clockout-party
   ADMIN_PASSWORD=원하는비밀번호 docker compose up -d --build
   ```
4. https 주소 만들기: 아래 3번의 Cloudflare Tunnel을 이 서버에서 실행하면 돼요.
5. 주의: 오라클은 7일 동안 거의 안 쓰인 무료 서버를 회수할 수 있어요. 손님이 꾸준히 있으면 괜찮아요.

## 3. 내 PC + Cloudflare Tunnel (계정 없이 바로)

1. 서버 켜기: `npm install` → `npm run build` → `npm start`
2. [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)를 설치하고:
   ```bash
   cloudflared tunnel --url http://localhost:2567
   ```
3. `https://어쩌구.trycloudflare.com` 주소가 나오면 그 주소를 친구에게 보내요. 끌 때마다 주소가 바뀌어요.

---

## 공통

| 설정 | 뜻 |
|---|---|
| `PORT` | 서버 포트 (호스팅이 자동으로 정해 줌, 기본 2567) |
| `ADMIN_PASSWORD` | 관리 페이지 비밀번호 (꼭 정하기) |
| `STATS_FILE` | 방문 기록 파일 위치 (기본 `server/data/visits.jsonl`) |
| `ADMIN_TZ` | 관리 페이지의 날짜 기준 (기본 `Asia/Seoul`) |
