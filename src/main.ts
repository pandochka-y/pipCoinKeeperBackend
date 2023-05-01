import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('pipCoinKeeper API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }))
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`
    console.log(`Server: http://localhost:${PORT}`)
    console.log(`Swagger: ${url}/api/docs`)
  })
}

bootstrap()
