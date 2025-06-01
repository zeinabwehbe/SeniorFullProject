import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  // Configure CORS to allow requests from your GitHub Pages frontend
  app.enableCors({
    origin: ['https://zeinabwehbe.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Serve static files from the uploads directory
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/users/profile-picture/',
  });
  // Serve static files from the frontend build
  app.useStaticAssets(
    join(__dirname, '..', '..', 'frontend', 'dist'),
    {
      index: 'homepage.html',
      prefix: '/'
    }
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
