// src/mail/mail.service.tsimport { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";
import axios from "axios";
import * as winston from "winston";
import { winstonLogger } from "src/common/logger/winston.logger";

dotenv.config();

const logger = winston.createLogger(winstonLogger);


export class MailService {
  private readonly transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  private readonly telegramBotToken =
    process.env.TELEGRAM_BOT_TOKEN ||
    "7838778700:AAHZ08Myk8Sw7eGtB5ykHrEKVjgy8w4zgqk";
  private readonly telegramAdminId = process.env.ADMIN_ID || "5655572400";

  async sendActivationLink({
    email,
    token,
    name,
  }: {
    email: string;
    token: string;
    name: string;
  }) {
    const activationLink = `http://localhost:5000/auth/activate/${token}`;

    if (!email) {
      logger.error("EMAIL YOQ!");
      throw new Error("Email manzili kiritilmagan!");
    }

    logger.info(`Email yuborilmoqda: ${email} 🔥🔥`);

    const subject = "🔐 Hisobingizni faollashtirish havolasi";

    const text = `
Assalomu alaykum ${name}!

Siz bizning tizimda ro‘yxatdan o‘tdingiz. Hisobingizni faollashtirish uchun quyidagi havolani bosing:

👉 ${activationLink}

Agar bu amalni siz bajarmagan bo‘lsangiz, bu xabarni e’tiborsiz qoldirishingiz mumkin.

Hurmat bilan,  
Bizning jamoamiz.
    `;

    try {
      // Отправляем письмо
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text,
      });

      logger.info(`Aktivatsiya xati muvaffaqiyatli yuborildi: ${email}`);

      // Отправляем токен админу в Telegram
      if (this.telegramAdminId) {
        this.sendTelegramNotification({ email, name, token }).catch((err) => {
          logger.error("Telegram xabarni yuborishda xatolik:", {
            error: err.message,
            telegramError: err.response?.data?.description || "No description",
            stack: err.stack,
          });
        });
      }

      return { success: true, message: "Aktivatsiya xati yuborildi" };
    } catch (error) {
      logger.error("Aktivatsiya havolasini yuborishda xatolik:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error("Aktivatsiya havolasini yuborishda xatolik yuz berdi");
    }
  }

  private async sendTelegramNotification({
    email,
    name,
    token,
  }: {
    email: string;
    name: string;
    token: string;
  }) {
    const timestamp = new Date().toISOString();
    const text =
      `📩 Yangi aktivatsiya kodi yuborildi!\n` +
      `⏰ Vaqt: ${timestamp}\n` +
      `👤 Ism: ${name}\n` +
      `📧 Email: ${email}\n` +
      `🔑 Token: ${token}`;

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`,
        {
          chat_id: Number(this.telegramAdminId),
          text,
        }
      );

      logger.info("Telegram xabari muvaffaqiyatli yuborildi!", {
        chat_id: this.telegramAdminId,
        telegramResponse: response.data,
      });
    } catch (error) {
      throw new Error(
        `Telegram xabarni yuborishda xatolik: ${error.message}, Telegram: ${JSON.stringify(
          error.response?.data || {}
        )}`
      );
    }
  }
}
