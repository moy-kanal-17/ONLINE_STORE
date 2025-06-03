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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFoodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFoodDto {
    name;
    image;
    price;
    rating;
    describtion;
    seller_id;
    skids;
    delivery_time;
}
exports.CreateFoodDto = CreateFoodDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Pizza", description: "Product name" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "pizza.jpg", description: "Product image filename" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.99, description: "Product price" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: "Product rating", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Delicious pizza",
        description: "Product description",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "describtion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Seller ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "seller_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: "Discount in percent",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "skids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "30 min",
        description: "Delivery time",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "delivery_time", void 0);
//# sourceMappingURL=create-food.dto.js.map