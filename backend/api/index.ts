// backend/api/index.ts

import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
}

const server = (async () => {
  await bootstrap();
  return serverless(expressApp);
})();

export default async function handler(req: any, res: any) {
  const h = await server;
  return h(req, res);
}
