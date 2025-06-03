export declare class MailService {
    private readonly transporter;
    private readonly telegramBotToken;
    private readonly telegramAdminId;
    sendActivationLink({ email, token, name, }: {
        email: string;
        token: string;
        name: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    private sendTelegramNotification;
}
