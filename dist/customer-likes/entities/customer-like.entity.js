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
exports.CustomerLike = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_entity_1 = require("../../customer/entities/customer.entity");
let CustomerLike = class CustomerLike extends sequelize_typescript_1.Model {
    product_id;
    customer_id;
    customer;
};
exports.CustomerLike = CustomerLike;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CustomerLike.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CustomerLike.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_entity_1.Customer),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CustomerLike.prototype, "customer_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_entity_1.Customer, { onDelete: "CASCADE" }),
    __metadata("design:type", customer_entity_1.Customer)
], CustomerLike.prototype, "customer", void 0);
exports.CustomerLike = CustomerLike = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "customer_likes",
        timestamps: true,
    })
], CustomerLike);
//# sourceMappingURL=customer-like.entity.js.map