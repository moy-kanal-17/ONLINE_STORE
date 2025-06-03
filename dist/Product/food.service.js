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
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const food_entity_1 = require("./entities/food.entity");
const file_service_1 = require("../file/file.service");
const handlebars_1 = require("handlebars");
let FoodService = class FoodService {
    foodModel;
    fileservice;
    constructor(foodModel, fileservice) {
        this.foodModel = foodModel;
        this.fileservice = fileservice;
    }
    async findAll() {
        return this.foodModel.findAll();
    }
    async remove(id) {
        const food = await this.foodModel.findByPk(id);
        if (!food) {
            throw new handlebars_1.Exception("Ovqat topilmadi");
        }
        await food.destroy();
        return { message: "Ovqat o‘chirildi" };
    }
    async findone(id) {
        return this.foodModel.findByPk(id);
    }
    async findOne(id) {
        return this.foodModel.findOne({
            where: { seller_id: +id },
        });
    }
    async create(createPatientDto, image) {
        const fileName = await this.fileservice.saveImage(image.buffer);
        console.log(fileName);
        return this.foodModel.create({ ...createPatientDto, image: fileName });
    }
    async update(id, update) {
        console.log(`Updating food with ID: ${id}`, update);
        if (!update || Object.keys(update).length === 0) {
            throw new common_1.BadRequestException("No data provided for update");
        }
        const result = await this.foodModel.update(update, { where: { id } });
        if (result[0] === 0) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return result;
    }
};
exports.FoodService = FoodService;
exports.FoodService = FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(food_entity_1.Product)),
    __metadata("design:paramtypes", [Object, file_service_1.FileService])
], FoodService);
//# sourceMappingURL=food.service.js.map