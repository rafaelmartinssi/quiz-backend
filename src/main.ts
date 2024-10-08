import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/not-found.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { PrismaGenericInterceptor } from './common/errors/interceptors/prisma-generic.interceptors';
import { BadRequestInterceptor } from './common/errors/interceptors/bad-request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new PrismaGenericInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new BadRequestInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
