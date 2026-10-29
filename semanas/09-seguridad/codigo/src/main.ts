import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app-config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port, '127.0.0.1');
  console.log(`API educativa disponible en http://127.0.0.1:${port}`);
}

void bootstrap();
