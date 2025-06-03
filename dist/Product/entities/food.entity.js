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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const buy_entity_1 = require("../../buy/entities/buy.entity");
const seller_entity_1 = require("../../seller/entities/seller.entity");
let Product = class Product extends sequelize_typescript_1.Model {
    buys;
    seller;
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => buy_entity_1.Buy),
    __metadata("design:type", Array)
], Product.prototype, "buys", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "name",
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(2500), allowNull: true }),
    __metadata("design:type", String)
], Product.prototype, "describtion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "image",
    }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL,
        allowNull: false,
        field: "price",
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: true,
        field: "rating",
    }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seller_entity_1.Seller),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "seller_id",
    }),
    __metadata("design:type", Number)
], Product.prototype, "seller_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => seller_entity_1.Seller),
    __metadata("design:type", seller_entity_1.Seller)
], Product.prototype, "seller", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "skids",
    }),
    __metadata("design:type", Number)
], Product.prototype, "skids", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        field: "delivery_time",
    }),
    __metadata("design:type", String)
], Product.prototype, "delivery_time", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "products",
        timestamps: true,
    })
], Product);
//# sourceMappingURL=food.entity.js.map