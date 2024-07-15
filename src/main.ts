import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { IServerConfig } from "./config/interfaces/server-config.interface";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serverConfig = configService.get<IServerConfig>('server');
  const PORT = serverConfig.port;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  const options = new DocumentBuilder()
    .setTitle('MLab test task')
    .setDescription('Just for tests')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(PORT);
  console.log(`Please, check Swagger for API exploring: http://localhost:${PORT}/api-docs`);
}
bootstrap();
