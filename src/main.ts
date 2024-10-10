import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['/'] });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.use(compression());
  app.use(helmet());
  await app.listen(PORT);
}
bootstrap();
