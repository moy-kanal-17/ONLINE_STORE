import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly telegramBotToken;
    private readonly telegramAdminId;
    catch(exception: unknown, host: ArgumentsHost): void;
    private sendTelegramNotification;
}
