import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    sendMessage(body: {
        chatId: string;
        message: string;
    }): {
        status: string;
        chatId: string;
        message: string;
    };
}
