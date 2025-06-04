"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const winston_logger_1 = require("../logger/winston.logger");
const axios_1 = require("axios");
const logger = winston.createLogger(winston_logger_1.winstonLogger);
let AllExceptionsFilter = class AllExceptionsFilter {
    telegramBotToken = process.env.TELEGRAM_BOT_TOKEN ||
        "7838778700:AAHZ08Myk8Sw7eGtB5ykHrEKVjgy8w4zgqk";
    telegramAdminId = process.env.ADMIN_ID || "7566075009";
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const timestamp = new Date().toISOString();
        const path = request.url;
        const method = request.method;
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";
        let stack = undefined;
        if (exception instanceof common_1.HttpException) {
            const res = exception.getResponse();
            message =
                typeof res === "string" ? res : res.message || "HttpException";
            stack = exception.stack;
        }
        else if (exception instanceof Error) {
            message = exception.message || "Error";
            stack = exception.stack;
        }
        else {
            try {
                message = JSON.stringify(exception) || "Unknown error";
            }
            catch {
                message = String(exception) || "Unknown error";
            }
        }
        const logPayload = {
            success: false,
            timestamp,
            statusCode: status,
            method,
            path,
            message,
            stack,
        };
        logger.error("Xato yuz berdi:", logPayload);
        if (this.telegramAdminId && status >= 400) {
            this.sendTelegramNotification(logPayload).catch((err) => {
                logger.error("Telegram xabarni yuborishda xatolik:", {
                    error: err.message,
                    telegramError: err.response?.data?.description || "No description",
                    stack: err.stack,
                });
            });
        }
        try {
            response.status(status).json({
                success: false,
                timestamp,
                path,
                method,
                statusCode: status,
                message,
            });
        }
        catch (err) {
            logger.error("Javob yuborishda xatolik:", {
                error: err.message,
                stack: err.stack,
            });
        }
    }
    async sendTelegramNotification(payload) {
        const { timestamp, statusCode, method, path, message, stack } = payload;
        let text = `🚨 Xato yuz berdi!\n` +
            `⏰ Vaqt: ${timestamp}\n` +
            `🔢 Status kodi: ${statusCode}\n` +
            `🛠 Metod: ${method}\n` +
            `🌐 Yo'l: ${path}\n` +
            `📜 Xabar: ${typeof message === "object" ? JSON.stringify(message, null, 2) : message}\n` +
            `${stack ? `📚 Stack: ${stack}` : ""}`;
        if (text.length > 4000) {
            text = text.substring(0, 4000) + "...";
        }
        try {
            const response = await axios_1.default.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                chat_id: Number(this.telegramAdminId),
                text,
            });
        }
        catch (error) {
            throw new Error(`Telegram xabarni yuborishda xatolik: ${error.message}, Telegram: ${JSON.stringify(error.response?.data || {})}`);
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=error.handlink.js.map