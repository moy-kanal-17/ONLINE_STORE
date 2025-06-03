import { TelegramService } from "./telegram/telegram.service";
export declare class AppController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    about(): {
        title: string;
    };
    policy(): {
        title: string;
    };
    contact(): {
        title: string;
    };
    main(): {
        title: string;
        foods: {
            id: number;
            name: string;
            author: string;
            price: number;
            rating: number;
            image: string;
            skids: number;
            category: string;
        }[];
    };
    handleContact(data: {
        name?: string;
        email?: string;
        message?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
