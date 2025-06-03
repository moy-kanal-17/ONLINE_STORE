"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const customer_entity_1 = require("./entities/customer.entity");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const jwt_1 = require("@nestjs/jwt");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                signOptions: { expiresIn: "15m" },
            }),
            sequelize_1.SequelizeModule.forFeature([customer_entity_1.Customer]),
        ],
        providers: [customer_service_1.CustomerService],
        controllers: [customer_controller_1.CustomerController],
        exports: [customer_service_1.CustomerService],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map