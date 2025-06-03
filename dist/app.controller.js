"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("./telegram/telegram.service");
const platform_express_1 = require("@nestjs/platform-express");
let AppController = class AppController {
    telegramService;
    constructor(telegramService) {
        this.telegramService = telegramService;
    }
    about() {
        return { title: "Biz Haqimizda" };
    }
    policy() {
        return { title: "Biz Haqimizda" };
    }
    contact() {
        return { title: "Kontaktlar" };
    }
    main() {
        return {
            title: "MY17Shop",
            foods: [
                {
                    id: 1,
                    name: "Burger",
                    author: "Chef John",
                    price: 25000,
                    rating: 4.5,
                    image: "burger.jpg",
                    skids: 10,
                    category: "food",
                },
            ],
        };
    }
    async handleContact(data) {
        if (!data || !data.name || !data.email || !data.message) {
            throw new common_1.BadRequestException("Ism, email va xabar kiritilishi shart");
        }
        const { name, email, message } = data;
        const telegramMessage = `
<b>Yangi xabar!</b>
<b>Ism:</b> ${name}
<b>Email:</b> ${email}
<b>Xabar:</b> ${message}
    `;
        await this.telegramService.sendMessage(telegramMessage);
        return { success: true, message: "Xabar yuborildi" };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("about"),
    (0, common_1.Render)("lnformation/about"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "about", null);
__decorate([
    (0, common_1.Get)("policy"),
    (0, common_1.Render)("lnformation/policy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "policy", null);
__decorate([
    (0, common_1.Get)("contact"),
    (0, common_1.Render)("lnformation/contact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "contact", null);
__decorate([
    (0, common_1.Get)("main"),
    (0, common_1.Render)("index"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "main", null);
__decorate([
    (0, common_1.Post)("api/contact"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("none")),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleContact", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService])
], AppController);
//# sourceMappingURL=app.controller.js.map