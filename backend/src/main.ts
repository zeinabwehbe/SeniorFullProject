import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Serve static files from the uploads directory
  // app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
  //   prefix: '/users/profile-picture/',
  // });
  // Serve static files from the frontend build
  // app.useStaticAssets(
  //   join(__dirname, '..', '..', 'frontend', 'dist'),
  // );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();


