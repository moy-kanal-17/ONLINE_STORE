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
exports.FilterAdminDto = exports.UpdateAdminDto = exports.CreateAdminDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAdminDto {
    full_name;
    email;
    username;
    password;
    is_active;
    iscreator;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Full name of the admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@example.com', description: 'Email address of the admin' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'johndoe', description: 'Username of the admin (optional)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Password for the admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Is the admin active?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Is the admin a creator?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "iscreator", void 0);
class UpdateAdminDto {
    full_name;
    email;
    username;
    password;
    is_active;
    iscreator;
    hashed_token;
    active_link;
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe', description: 'Full name of the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin@example.com', description: 'Email address of the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'johndoe', description: 'Username of the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'newpassword123', description: 'New password for the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Is the admin active?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAdminDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Is the admin a creator?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAdminDto.prototype, "iscreator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'token123', description: 'Hashed token for the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "hashed_token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'link123', description: 'Active link for the admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "active_link", void 0);
class FilterAdminDto {
    email;
    is_active;
    iscreator;
    sort_by;
    sort_order;
}
exports.FilterAdminDto = FilterAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin@example.com', description: 'Filter by email (partial match)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Filter by active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterAdminDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Filter by creator status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterAdminDto.prototype, "iscreator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'full_name', description: 'Field to sort by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterAdminDto.prototype, "sort_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ASC', description: 'Sort order (ASC or DESC)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterAdminDto.prototype, "sort_order", void 0);
//# sourceMappingURL=admin.dto.js.map