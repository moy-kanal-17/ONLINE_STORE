"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const food_module_1 = require("./Product/food.module");
const file_module_1 = require("./file/file.module");
const auth_module_1 = require("./auth/auth.module");
const buy_module_1 = require("./buy/buy.module");
const pay_module_1 = require("./pay/pay.module");
const customer_module_1 = require("./customer/customer.module");
const customer_likes_module_1 = require("./customer-likes/customer-likes.module");
const food_entity_1 = require("./Product/entities/food.entity");
const pay_entity_1 = require("./pay/entities/pay.entity");
const customer_entity_1 = require("./customer/entities/customer.entity");
const buy_entity_1 = require("./buy/entities/buy.entity");
const customer_like_entity_1 = require("./customer-likes/entities/customer-like.entity");
const jwt_1 = require("@nestjs/jwt");
const seller_module_1 = require("./seller/seller.module");
const admin_module_1 = require("./admin/admin.module");
const seller_entity_1 = require("./seller/entities/seller.entity");
const app_controller_1 = require("./app.controller");
const telegram_module_1 = require("./telegram/telegram.module");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.DB_HOST || "localhost",
                port: Number(process.env.DB_PORT) || 5432,
                username: process.env.PG_USERNAME || "postgres",
                password: process.env.PG_PASSWORD || "moykanal17",
                database: process.env.PG_NAME || "ovqat",
                models: [food_entity_1.Product, seller_entity_1.Seller, pay_entity_1.Pay, customer_entity_1.Customer, buy_entity_1.Buy, customer_like_entity_1.CustomerLike],
                autoLoadModels: true,
                synchronize: true,
                sync: { alter: true },
                logging: false,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 4,
                },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                signOptions: { expiresIn: "1h" },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "src", "views"),
            }),
            food_module_1.FoodModule,
            file_module_1.FileModule,
            auth_module_1.AuthModule,
            buy_module_1.BuyModule,
            pay_module_1.PayModule,
            customer_module_1.CustomerModule,
            customer_likes_module_1.CustomerLikesModule,
            seller_module_1.SellerModule,
            admin_module_1.AdminModule,
            telegram_module_1.TelegramModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
        exports: [jwt_1.JwtModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map