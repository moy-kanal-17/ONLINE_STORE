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
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const food_service_1 = require("./food.service");
const create_food_dto_1 = require("./dto/create-food.dto");
const update_food_dto_1 = require("./dto/update-food.dto");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const admin_guard_1 = require("../common/guards/admin.guard");
const role_guard_1 = require("../common/guards/role.guard");
const customer_service_1 = require("../customer/customer.service");
let FoodController = class FoodController {
    foodService;
    jwtService;
    customerService;
    constructor(foodService, jwtService, customerService) {
        this.foodService = foodService;
        this.jwtService = jwtService;
        this.customerService = customerService;
    }
    create(createPatientDto, avatar) {
        return this.foodService.create(createPatientDto, avatar);
    }
    async remove(id) {
        return this.foodService.remove(id);
    }
    update(id, update) {
        return this.foodService.update(+id, update);
    }
    async findone(id) {
        try {
            const product = await this.foodService.findone(+id);
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        }
        catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }
    async findo(id, res) {
        try {
            const product = await this.foodService.findone(+id);
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${id} not found`);
            }
            return res.render("product", {
                title: "Product Details",
                product: product,
            });
        }
        catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }
    async getAllFood() {
        const foods = await this.foodService.findAll();
        return foods;
    }
    async getAccount(req, res) {
        try {
            const token = req.cookies["access_token"];
            if (!token) {
                return res.redirect("/auth/login");
            }
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
            });
            const userId = decoded.sub;
            const user = await this.customerService.findOne(userId);
            if (!user) {
                return res.redirect("/auth/login");
            }
            return {
                title: "Ovqatlar ro‘yxati",
                user,
            };
        }
        catch (error) {
            console.error("JWT verify error:", error.message);
            return res.redirect("/login");
        }
    }
    async adminFoods(req) {
        try {
            const adminId = req.user?.sub;
            if (!adminId) {
                throw new common_1.UnauthorizedException("Admin ID not found");
            }
            const users = await this.customerService.findAll();
            const products = await this.foodService.findAll();
            console.log("Products🛎️:", products);
            return {
                title: "Admin paneli",
                users,
                products,
                admin: adminId,
            };
        }
        catch (error) {
            console.error("Error in adminFoods:", error);
            throw new common_1.InternalServerErrorException("Failed to load admin panel data");
        }
    }
    async getAllFoods() {
        const foods = await this.foodService.findAll();
        return {
            title: "Ovqatlar ro‘yxati",
            foods: foods,
        };
    }
};
exports.FoodController = FoodController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_food_dto_1.CreateFoodDto, Object]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_food_dto_1.UpdateFoodDto]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("foods/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "findone", null);
__decorate([
    (0, common_1.Get)("product/:id"),
    (0, common_1.Render)("product"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "findo", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getAllFood", null);
__decorate([
    (0, common_1.Get)("account"),
    (0, common_1.Render)("account"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getAccount", null);
__decorate([
    (0, common_1.Get)("admin"),
    (0, common_1.UseGuards)(admin_guard_1.AdminhGuard),
    (0, common_1.Render)("admin"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "adminFoods", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleRedirectGuard),
    (0, common_1.Get)("main"),
    (0, common_1.Render)("index"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getAllFoods", null);
exports.FoodController = FoodController = __decorate([
    (0, common_1.Controller)("foods"),
    __metadata("design:paramtypes", [food_service_1.FoodService,
        jwt_1.JwtService,
        customer_service_1.CustomerService])
], FoodController);
//# sourceMappingURL=food.controller.js.map