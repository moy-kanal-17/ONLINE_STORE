import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('contacts')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}
  @Post()
  sendMessage(@Body() body: { chatId: string; message: string }) {
    this.telegramService.sendMessage( body.message);
    return {
      status: 'success',
      chatId: body.chatId,
      message: body.message,
    };
  }
}