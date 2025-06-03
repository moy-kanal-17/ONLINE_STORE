"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pay_dto_1 = require("./create-pay.dto");
class UpdatePayDto extends (0, mapped_types_1.PartialType)(create_pay_dto_1.CreatePayDto) {
}
exports.UpdatePayDto = UpdatePayDto;
//# sourceMappingURL=update-pay.dto.js.map