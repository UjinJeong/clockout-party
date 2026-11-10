import { listen } from '@colyseus/tools';
import app from './app';

const port = Number(process.env.PORT ?? 2567);
listen(app, port).then(() => {
  console.log(`🎉 파티 서버 실행 중: ws://localhost:${port}`);
});
