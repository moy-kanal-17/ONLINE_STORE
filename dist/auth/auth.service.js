"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const mail_service_1 = require("../mail/mail.service");
const customer_entity_1 = require("../customer/entities/customer.entity");
const seller_entity_1 = require("../seller/entities/seller.entity");
const admin_model_1 = require("../admin/model/admin.model");
let AuthService = class AuthService {
    CustomerModel;
    sellerModel;
    adminModel;
    jwtService;
    mailService;
    constructor(CustomerModel, sellerModel, adminModel, jwtService, mailService) {
        this.CustomerModel = CustomerModel;
        this.sellerModel = sellerModel;
        this.adminModel = adminModel;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(createUserDto, role) {
        const { email, password, ...rest } = createUserDto;
        let existingUser = null;
        let newUser;
        if (role === "customer") {
            existingUser = await this.CustomerModel.findOne({ where: { email } });
            if (existingUser) {
                throw new common_1.BadRequestException(`Ushbu email (${email}) Customer uchun band`);
            }
        }
        else if (role === "seller") {
            existingUser = await this.sellerModel.findOne({ where: { email } });
            if (existingUser) {
                console.log(existingUser);
                throw new common_1.BadRequestException(`Ushbu email (${email}) seller uchun band`);
            }
        }
        else if (role === "admin") {
            existingUser = await this.adminModel.findOne({ where: { email } });
            if (existingUser) {
                console.log(existingUser);
                throw new common_1.BadRequestException(`Ushbu email (${email}) admin uchun band`);
            }
        }
        else if (role === "creator") {
            existingUser = await this.adminModel.findOne({ where: { email: email, iscreator: true } });
            if (existingUser) {
                console.log(existingUser);
                throw new common_1.BadRequestException(`Ushbu email (${email}) admin uchun band`);
            }
        }
        else {
            throw new common_1.BadRequestException("Ro'yxatdan o'tish uchun yaroqsiz rol");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const activationToken = (0, crypto_1.randomUUID)();
        if (role === "customer") {
            newUser = await this.CustomerModel.create({
                ...rest,
                email,
                password: hashedPassword,
                active_link: activationToken,
            });
        }
        else if (role === "seller") {
            newUser = await this.sellerModel.create({
                ...rest,
                email,
                password: hashedPassword,
                active_link: activationToken,
            });
        }
        else if (role === "admin") {
            newUser = await this.adminModel.create({
                ...rest,
                email,
                password: hashedPassword,
                active_link: activationToken,
            });
        }
        else if (role === "creator") {
            newUser = await this.adminModel.create({
                ...rest,
                email,
                password: hashedPassword,
                active_link: activationToken,
            });
        }
        else {
            throw new common_1.BadRequestException("Ro'yxatdan o'tish jarayonida xato: Noto'g'ri rol");
        }
        if (!newUser.email) {
            console.log(newUser);
            console.error("Xato: Yaratilgan user obyekti yoki uning emaili mavjud emas!");
        }
        console.log(newUser.email);
        await this.mailService.sendActivationLink({
            email: newUser.email,
            token: activationToken,
            name: newUser.first_name ||
                newUser.shop_name ||
                "foydalanuvchi",
        });
        return true;
    }
    async login(loginDto, res) {
        const { email, password, role } = loginDto;
        let user = null;
        if (role === "customer") {
            user = await this.CustomerModel.findOne({ where: { email: email } });
        }
        else if (role === "seller") {
            user = await this.sellerModel.findOne({ where: { email } });
        }
        else if (role === "admin") {
            user = await this.adminModel.findOne({ where: { email } });
        }
        else if (role === "creator") {
            user = await this.adminModel.findOne({ where: { email: email, iscreator: true } });
        }
        else {
            console.log(user);
            throw new common_1.BadRequestException("Login uchun yaroqsiz rol");
        }
        if (!user || !user.password) {
            console.log(user?.password, "👨‍💻");
            throw new common_1.UnauthorizedException("Email yoki parol noto'g'r👨‍💻i");
        }
        if (role !== "admin" && user.is_active === false) {
            const activationToken = (0, crypto_1.randomUUID)();
            await user.update({ active_link: activationToken });
            await this.mailService.sendActivationLink({
                email: user.email,
                token: activationToken,
                name: user.first_name ||
                    user.shop_name ||
                    "foydalanuvchi",
            });
            throw new common_1.UnauthorizedException("Hisobingiz faollashtirilmagan. Emailingizni tekshiring.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Email yoki parol noto'g'ri");
        }
        const payload = { sub: user.id, email: user.email, role };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
            expiresIn: "15m",
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET || "refresh-secret-replace-me",
            expiresIn: "7d",
        });
        const hashedToken = await bcrypt.hash(refresh_token, 10);
        await user.update({ hashed_token: hashedToken });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.redirect("/foods/main");
    }
    async activateUser(token) {
        let user = await this.CustomerModel.findOne({
            where: { active_link: token },
        });
        let userType = "customer";
        if (!user) {
            user = await this.sellerModel.findOne({
                where: { active_link: token },
            });
            userType = "seller";
        }
        if (!user && this.adminModel) {
            user = await this.adminModel.findOne({
                where: { active_link: token },
            });
            userType = "admin";
        }
        if (!user) {
            throw new common_1.NotFoundException("Token noto‘g‘ri yoki foydalanuvchi topilmadi");
        }
        user.is_active = true;
        user.active_link = "null";
        await user.save();
        return {
            message: "Hisob muvaffaqiyatli faollashtirildi!",
            type: userType,
        };
    }
    async refreshToken(refresh_token, res) {
        if (!refresh_token) {
            throw new common_1.UnauthorizedException("Refresh token topilmadi");
        }
        try {
            const payload = await this.jwtService.verifyAsync(refresh_token, {
                secret: process.env.JWT_REFRESH_SECRET || "refresh-secret-replace-me",
            });
            let user = null;
            if (payload.role === "Customer") {
                user = await this.CustomerModel.findByPk(payload.sub);
            }
            else if (payload.role === "seller") {
                user = await this.sellerModel.findByPk(payload.sub);
            }
            else if (payload.role === "admin") {
                user = await this.adminModel.findByPk(payload.sub);
            }
            else {
                throw new common_1.UnauthorizedException("Tokenedagi rol yaroqsiz");
            }
            if (!user || !user.hashed_token) {
                throw new common_1.UnauthorizedException("Foydalanuvchi topilmadi yoki token yaroqsiz");
            }
            const isTokenMatch = await bcrypt.compare(refresh_token, user.hashed_token);
            if (!isTokenMatch) {
                throw new common_1.UnauthorizedException("Refresh token noto'g'ri");
            }
            const newPayload = {
                sub: user.id,
                email: user.email,
                role: payload.role,
            };
            const new_access_token = await this.jwtService.signAsync(newPayload, {
                secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
                expiresIn: "15m",
            });
            const new_refresh_token = await this.jwtService.signAsync(newPayload, {
                secret: process.env.JWT_REFRESH_SECRET || "refresh-secret-replace-me",
                expiresIn: "7d",
            });
            const hashedToken = await bcrypt.hash(new_refresh_token, 10);
            await user.update({ hashed_token: hashedToken });
            res.cookie("refresh_token", new_refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return { access_token: new_access_token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Yaroqsiz refresh token");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(customer_entity_1.Customer)),
    __param(1, (0, sequelize_1.InjectModel)(seller_entity_1.Seller)),
    __param(2, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object, Object, Object, jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map