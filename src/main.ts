import { NestFactory } from '@nestjs/core';import { AppModule } from './app.module';import { NestExpressApplication } from '@nestjs/platform-express';import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as hbs from 'hbs';
import * as methodOverride from "method-override";
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './common/logger/winston.logger';
import { AllExceptionsFilter } from './common/errors/error.handlink';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{logger:WinstonModule.createLogger(winstonLogger)});

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('hbs');
  app.use(methodOverride("_method"));
  app.use(cookieParser());

  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });


  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API hujjatlari')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
    
  });
}
bootstrap();
