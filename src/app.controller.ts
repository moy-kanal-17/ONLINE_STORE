// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Render,
  Body,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { TelegramService } from "./telegram/telegram.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get("about")
  @Render("lnformation/about")
  about() {
    return { title: "Biz Haqimizda" };
  }


  @Get("policy")
  @Render("lnformation/policy")
  policy() {
    return { title: "Biz Haqimizda" };
  }

  @Get("contact")
  @Render("lnformation/contact")
  contact() {
    return { title: "Kontaktlar" };
  }

  @Get("main")
  @Render("index")
  main() {
    return {
      title: "MY17Shop",
      foods: [
        {
          id: 1,
          name: "Burger",
          author: "Chef John",
          price: 25000,
          rating: 4.5,
          image: "burger.jpg",
          skids: 10,
          category: "food",
        },
      ],
    };
  }

  @Post("api/contact")
  @UseInterceptors(FileInterceptor("none")) // Для обработки FormData без файлов
  async handleContact(
    @Body() data: { name?: string; email?: string; message?: string }
  ) {
    // Проверяем, что данные пришли
    if (!data || !data.name || !data.email || !data.message) {
      throw new BadRequestException("Ism, email va xabar kiritilishi shart");
    }

    const { name, email, message } = data;

    const telegramMessage = `
<b>Yangi xabar!</b>
<b>Ism:</b> ${name}
<b>Email:</b> ${email}
<b>Xabar:</b> ${message}
    `;

    await this.telegramService.sendMessage(telegramMessage);
    return { success: true, message: "Xabar yuborildi" };
  }
}
