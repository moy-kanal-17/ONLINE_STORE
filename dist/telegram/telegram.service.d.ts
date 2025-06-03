import { ConfigService } from "@nestjs/config";
export declare class TelegramService {
    private configService;
    private readonly bot;
    private readonly chatId;
    constructor(configService: ConfigService);
    sendMessage(message: string): Promise<void>;
}
