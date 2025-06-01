import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverless from 'serverless-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer: ReturnType<typeof serverless>;

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://zeinabwehbe.github.io',
      'http://localhost:3000',
      'https://senior-full-project-bsn1.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/users/profile-picture/',
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'), {
    index: 'homepage.html',
    prefix: '/',
  });

  await app.init(); // Important for serverless

  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await createApp();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(req, res);
}

// For local development:
if (process.env.VERCEL !== '1') {
  createApp().then(app => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  });
}
