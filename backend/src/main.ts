import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverless from 'serverless-http';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer;

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Add this for Vercel deployment
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: [
      'https://zeinabwehbe.github.io',
      'http://localhost:3000',
      'https://senior-full-project-bsn1.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
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

// export this to vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await createApp();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(req, res);
}

// Local development
if (process.env.VERCEL !== '1') {
  createApp().then(app =>
    app.listen(process.env.PORT || 3000).then(() => {
      console.log('🚀 Running locally on port 3000');
    }),
  );
}
