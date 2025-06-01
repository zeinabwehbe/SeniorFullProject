import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import serverless from 'serverless-http';
import { Handler, Context, Callback } from 'aws-lambda';

let cachedServer: Handler;

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['https://zeinabwehbe.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
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

// ✅ Vercel calls this handler
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  if (!cachedServer) {
    const app = await createApp();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(event, context, callback);
};

// ✅ Local development entry point
if (process.env.VERCEL !== '1') {
  createApp().then(app =>
    app.listen(process.env.PORT || 3000).then(() => {
      console.log('🚀 Server running locally...');
    }),
  );
}
