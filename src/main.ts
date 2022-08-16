import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./common/pipes/validation.pipe";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Audio app")
    .setDescription("Documentation REST API")
    .setVersion("1.0.0")
    .addTag("Rodion Leg")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== "production") {
    SwaggerModule.setup("/api/docs", app, document);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
