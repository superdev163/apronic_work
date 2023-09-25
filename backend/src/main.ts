import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix('api');
  await app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EVENT API')
    .setDescription('API documentation for event management')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger/doc', app, document);

  await app.listen(3000);
}
bootstrap();
