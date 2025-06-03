"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyModule = void 0;
const common_1 = require("@nestjs/common");
const buy_service_1 = require("./buy.service");
const buy_controller_1 = require("./buy.controller");
const sequelize_1 = require("@nestjs/sequelize");
const buy_entity_1 = require("./entities/buy.entity");
const customer_module_1 = require("../customer/customer.module");
const jwt_1 = require("@nestjs/jwt");
const seller_module_1 = require("../seller/seller.module");
const admin_module_1 = require("../admin/admin.module");
let BuyModule = class BuyModule {
};
exports.BuyModule = BuyModule;
exports.BuyModule = BuyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                signOptions: { expiresIn: "15m" },
            }),
            customer_module_1.CustomerModule,
            seller_module_1.SellerModule,
            admin_module_1.AdminModule,
            sequelize_1.SequelizeModule.forFeature([buy_entity_1.Buy]),
            (0, common_1.forwardRef)(() => customer_module_1.CustomerModule),
        ],
        controllers: [buy_controller_1.BuyController],
        providers: [buy_service_1.BuyService],
        exports: [buy_service_1.BuyService],
    })
], BuyModule);
//# sourceMappingURL=buy.module.js.map