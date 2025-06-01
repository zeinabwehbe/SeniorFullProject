import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverless from 'serverless-http';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer;

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://zeinabwehbe.github.io',
      'http://localhost:3000',
      'https://senior-full-project-bsn1.vercel.app'
    ],
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/users/profile-picture/',
  });

  return app;
}

// Vercel handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await createApp();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(req, res);
}
