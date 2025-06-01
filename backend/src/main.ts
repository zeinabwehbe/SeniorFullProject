import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverless from 'serverless-http';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer: any;

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://zeinabwehbe.github.io',
      'http://localhost:3000',
      'https://senior-full-project-bsn1.vercel.app',
      'https://senior-full-project-bsn1.vercel.app:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/users/profile-picture/',
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'), {
    index: 'homepage.html',
    prefix: '/',
  });

  return app;
}

// ✅ Correctly export as Vercel serverless handler
export const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (!cachedServer) {
    const app = await createApp();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(req, res);
};


// ✅ Local development support
if (process.env.VERCEL !== '1') {
  createApp().then(app =>
    app.listen(process.env.PORT || 3000).then(() => {
      console.log('🚀 Running locally on port 3000');
    }),
  );
}
