import { Injectable } from "@nestjs/common";import { ConfigService } from "@nestjs/config";
import * as TelegramBot from "node-telegram-bot-api";

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;
  private readonly chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>("TELEGRAM_BOT_TOKEN");
    this.chatId =
      this.configService.get<string>("TELEGRAM_CHAT_ID") || "5655572400";
    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: "HTML" });
      console.log("Telegram message sent:", message);
    } catch (error) {
      console.error("Error sending Telegram message:", error);
    }
  }
}
