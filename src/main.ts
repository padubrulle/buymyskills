import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Buy My skills APIs')
  .setDescription('All API endpoints for the buy my skills API')
  .setVersion('1.0')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
