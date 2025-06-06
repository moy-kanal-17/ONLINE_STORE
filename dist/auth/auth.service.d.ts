import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-users.dto';
import { LoginDto } from './dto/login-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { Admin } from 'src/admin/model/admin.model';
export declare class AuthService {
    private readonly CustomerModel;
    private readonly sellerModel;
    private readonly adminModel;
    private readonly jwtService;
    private readonly mailService;
    constructor(CustomerModel: typeof Customer, sellerModel: typeof Seller, adminModel: typeof Admin, jwtService: JwtService, mailService: MailService);
    signout(userId: number, role: "customer" | "seller" | "admin" | "creator", res: Response): Promise<void>;
    register(createUserDto: CreateUserDto, role: "customer" | "seller" | "creator" | "admin"): Promise<boolean>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
    activateUser(token: string): Promise<{
        message: string;
        type: string;
    }>;
    refreshToken(refresh_token: string, res: Response): Promise<{
        access_token: string;
    }>;
}
