"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerLikesModule = void 0;
const common_1 = require("@nestjs/common");
const customer_likes_service_1 = require("./customer-likes.service");
const customer_likes_controller_1 = require("./customer-likes.controller");
const customer_like_entity_1 = require("./entities/customer-like.entity");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const customer_module_1 = require("../customer/customer.module");
const seller_module_1 = require("../seller/seller.module");
const admin_module_1 = require("../admin/admin.module");
let CustomerLikesModule = class CustomerLikesModule {
};
exports.CustomerLikesModule = CustomerLikesModule;
exports.CustomerLikesModule = CustomerLikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                signOptions: { expiresIn: "15m" },
            }),
            customer_module_1.CustomerModule,
            seller_module_1.SellerModule,
            admin_module_1.AdminModule,
            sequelize_1.SequelizeModule.forFeature([customer_like_entity_1.CustomerLike]),
        ],
        controllers: [customer_likes_controller_1.CustomerLikeController],
        providers: [customer_likes_service_1.CustomerLikeService],
        exports: [customer_likes_service_1.CustomerLikeService],
    })
], CustomerLikesModule);
//# sourceMappingURL=customer-likes.module.js.map