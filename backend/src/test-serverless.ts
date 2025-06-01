import { createServer } from 'http';
import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

async function start() {
  const expressApp = await createApp();
  const handler = serverless(expressApp);

  const server = createServer((req, res) => {
    handler(req, res).catch(err => {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  });

  server.listen(3000, () => console.log('Serverless http server running on http://localhost:3000'));
}

start();
