import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  console.log('NestJS app initialized');
}

const server = (async () => {
  try {
    await bootstrap();
    return serverless(expressApp);
  } catch (error) {
    console.error('Bootstrap error:', error);
    throw error;
  }
})();

// export default async function handler(req: any, res: any) {
//   try {
//     const h = await server;
//     return h(req, res);
//   } catch (error) {
//     console.error('Handler error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' });
}

