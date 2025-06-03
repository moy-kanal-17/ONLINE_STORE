"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBuyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_buy_dto_1 = require("./create-buy.dto");
class UpdateBuyDto extends (0, mapped_types_1.PartialType)(create_buy_dto_1.CreateBuyDto) {
}
exports.UpdateBuyDto = UpdateBuyDto;
//# sourceMappingURL=update-buy.dto.js.map