import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('pipCoinKeeper API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    return console.log(`Server is running on http://localhost:${PORT}`)
  })
}

bootstrap()
