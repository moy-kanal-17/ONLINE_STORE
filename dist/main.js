"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const hbs = require("hbs");
const methodOverride = require("method-override");
const nest_winston_1 = require("nest-winston");
const winston_logger_1 = require("./common/logger/winston.logger");
const error_handlink_1 = require("./common/errors/error.handlink");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: nest_winston_1.WinstonModule.createLogger(winston_logger_1.winstonLogger) });
    app.useGlobalFilters(new error_handlink_1.AllExceptionsFilter());
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'src', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'src', 'views'));
    app.setViewEngine('hbs');
    app.use(methodOverride("_method"));
    app.use(cookieParser());
    hbs.registerHelper('eq', function (a, b) {
        return a === b;
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My API')
        .setDescription('API hujjatlari')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map