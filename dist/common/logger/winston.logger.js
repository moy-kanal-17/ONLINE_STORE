"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
exports.winstonLogger = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp(), nest_winston_1.utilities.format.nestLike("Online_Market18")),
        }),
        new winston.transports.File({
            filename: "logs/combine.log",
            level: "info",
            format: winston.format.combine(winston.format.label({ label: "Online_Market" }), winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: "logs/warn.log",
            level: "warn",
            format: winston.format.combine(winston.format.timestamp(), winston.format.label({ label: "Online_Market" }), winston.format.json()),
        }),
        new winston.transports.File({
            filename: "logs/errors.log",
            level: "error",
            format: winston.format.combine(winston.format.timestamp(), winston.format.label({ label: "Online_Market" }), winston.format.json()),
        }),
    ],
};
//# sourceMappingURL=winston.logger.js.map