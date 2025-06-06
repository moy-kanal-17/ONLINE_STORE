import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { LoginDto } from "./dto/login-auth.dto";
import { Request, Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto, role: "customer" | "seller" | "creator" | "admin", res: Response): Promise<void | Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, res: Response): Promise<{
        data: LoginDto;
        error: any;
    } | undefined>;
    logOut(id: number, role: "customer" | "seller" | "admin" | "creator", res: Response): Promise<void>;
    getRegistriPage(): {
        data: {
            email: string;
            role: string;
        };
        error: null;
    };
    getLoginPage(): {
        data: {
            email: string;
            role: string;
        };
        error: null;
    };
    activateUser(token: string): Promise<{
        message: string;
        type: string;
    }>;
    refreshToken(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
}
