"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
const customer_module_1 = require("../customer/customer.module");
const customer_entity_1 = require("../customer/entities/customer.entity");
const seller_entity_1 = require("../seller/entities/seller.entity");
const admin_model_1 = require("../admin/model/admin.model");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([seller_entity_1.Seller, customer_entity_1.Customer, admin_model_1.Admin]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                signOptions: { expiresIn: "15m" },
            }),
            customer_module_1.CustomerModule,
            mail_module_1.MailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map