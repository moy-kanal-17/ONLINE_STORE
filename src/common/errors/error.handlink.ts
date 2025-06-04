
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as winston from "winston";
import { winstonLogger } from "../logger/winston.logger";
import axios from "axios";

const logger = winston.createLogger(winstonLogger);

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly telegramBotToken =
    process.env.TELEGRAM_BOT_TOKEN ||
    "7838778700:AAHZ08Myk8Sw7eGtB5ykHrEKVjgy8w4zgqk";
  private readonly telegramAdminId = process.env.ADMIN_ID || "7566075009";

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = request.url;
    const method = request.method;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | object = "Internal server error";
    let stack: string | undefined = undefined;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message =
        typeof res === "string" ? res : (res as any).message || "HttpException";
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message || "Error";
      stack = exception.stack;
    } else {
      try {
        message = JSON.stringify(exception) || "Unknown error";
      } catch {
        message = String(exception) || "Unknown error";
      }
    }

    const logPayload: {
      success: boolean;
      timestamp: string;
      statusCode: number;
      method: string;
      path: string;
      message: string | object;
      stack?: string;
    } = {
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
    } catch (err) {
      logger.error("Javob yuborishda xatolik:", {
        error: err.message,
        stack: err.stack,
      });
    }
  }

  private async sendTelegramNotification(payload: {
    timestamp: string;
    statusCode: number;
    method: string;
    path: string;
    message: string | object;
    stack?: string;
  }) {
    const { timestamp, statusCode, method, path, message, stack } = payload;

    let text =
      `🚨 Xato yuz berdi!\n` +
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
      const response = await axios.post(
        `https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`,
        {
          chat_id: Number(this.telegramAdminId),
          text,
        }
      );

      // logger.info("Telegram xabari muvaffaqiyatli yuborildi:", {
      //   chat_id: this.telegramAdminId,
      //   telegramResponse: response.data,
      // });
    } catch (error) {
      throw new Error(
        `Telegram xabarni yuborishda xatolik: ${error.message}, Telegram: ${JSON.stringify(
          error.response?.data || {}
        )}`
      );
    }
  }
}
