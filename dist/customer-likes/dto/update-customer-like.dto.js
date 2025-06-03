"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerLikeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_customer_like_dto_1 = require("./create-customer-like.dto");
class UpdateCustomerLikeDto extends (0, mapped_types_1.PartialType)(create_customer_like_dto_1.CreateCustomerLikeDto) {
}
exports.UpdateCustomerLikeDto = UpdateCustomerLikeDto;
//# sourceMappingURL=update-customer-like.dto.js.map