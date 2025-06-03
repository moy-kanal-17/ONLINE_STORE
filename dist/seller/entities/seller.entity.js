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
exports.Seller = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Seller = class Seller extends sequelize_typescript_1.Model {
};
exports.Seller = Seller;
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Seller.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Seller.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Seller.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Seller.prototype, "phone_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], Seller.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], Seller.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Seller.prototype, "active_link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Seller.prototype, "hashed_token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], Seller.prototype, "adress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Seller.prototype, "password", void 0);
exports.Seller = Seller = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "sellers" })
], Seller);
//# sourceMappingURL=seller.entity.js.map