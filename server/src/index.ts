import { listen } from '@colyseus/tools';
import app from './app';
import { adminPassword, generatedPassword } from './admin';

const port = Number(process.env.PORT ?? 2567);
listen(app, port).then(() => {
  console.log(`🎉 파티 서버 실행 중: ws://localhost:${port}`);
  console.log(`🔑 관리 페이지: http://localhost:${port}/admin  (아이디는 아무거나, 비밀번호: ${generatedPassword ? adminPassword + '  ← 서버를 켤 때마다 바뀌어요. 고정하려면 ADMIN_PASSWORD를 정하세요' : 'ADMIN_PASSWORD에 정한 값'})`);
});
