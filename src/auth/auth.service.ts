import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { randomUUID } from 'crypto';
  import { Response } from 'express';
  

  
  import { CreateUserDto } from './dto/create-users.dto';
  import { LoginDto } from './dto/login-auth.dto';
  import { MailService } from 'src/mail/mail.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { Admin } from 'src/admin/model/admin.model';


  @Injectable()
  export class AuthService {
    constructor(
      @InjectModel(Customer)
      private readonly CustomerModel: typeof Customer,

      @InjectModel(Seller)
      private readonly sellerModel: typeof Seller,

      @InjectModel(Admin)
      private readonly adminModel: typeof Admin,

      private readonly jwtService: JwtService,
      private readonly mailService: MailService
    ) {}

    async signout(
      userId: string,
      role: "customer" | "seller" | "admin" | "creator",
      res: Response
    ) {
      let user: Customer | Seller | Admin | null = null;

      console.log("user ID:", userId, "user Role:", role, "👨‍💻");

      if (role === "customer") {
        user = await this.CustomerModel.findByPk(userId);
      } else if (role === "seller") {
        user = await this.sellerModel.findByPk(userId);
      } else if (role === "admin") {
        user = await this.adminModel.findByPk(userId);
      } else if (role === "creator") {
        user = await this.adminModel.findOne({
          where: { id: userId, iscreator: true },
        });
      }

      if (!user) {
        console.log(user, "👨‍💻");

        throw new NotFoundException("Foydalanuvchi topilmadi");
      }

      if (role === "admin" || role === "creator") {
        // await this.adminModel.update({ hashed_token: null });
      }

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Возвращаем ответ
      res.json({ message: "Tizimdan muvaffaqiyatli chiqildi" });
    }

    async register(
      createUserDto: CreateUserDto,
      role: "customer" | "seller" | "creator" | "admin"
    ) {
      const { email, password, ...rest } = createUserDto as any;

      let existingUser: Customer | Seller | Admin | null = null;
      let newUser: Customer | Seller | Admin;

      if (role === "customer") {
        existingUser = await this.CustomerModel.findOne({ where: { email } });
        if (existingUser) {
          throw new BadRequestException(
            `Ushbu email (${email}) Customer uchun band`
          );
        }
      } else if (role === "seller") {
        existingUser = await this.sellerModel.findOne({ where: { email } });
        if (existingUser) {
          console.log(existingUser);
          throw new BadRequestException(
            `Ushbu email (${email}) seller uchun band`
          );
        }
      } else if (role === "admin") {
        existingUser = await this.adminModel.findOne({ where: { email } });
        if (existingUser) {
          console.log(existingUser);
          throw new BadRequestException(
            `Ushbu email (${email}) admin uchun band`
          );
        }
      } else if (role === "creator") {
        existingUser = await this.adminModel.findOne({
          where: { email: email, iscreator: true },
        });
        if (existingUser) {
          console.log(existingUser);
          throw new BadRequestException(
            `Ushbu email (${email}) admin uchun band`
          );
        }
      } else {
        throw new BadRequestException("Ro'yxatdan o'tish uchun yaroqsiz rol");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const activationToken = randomUUID();

      if (role === "customer") {
        newUser = await this.CustomerModel.create({
          ...rest,
          email,
          password: hashedPassword,
          active_link: activationToken,
        });
      } else if (role === "seller") {
        newUser = await this.sellerModel.create({
          ...rest,
          email,
          password: hashedPassword,
          active_link: activationToken,
        });
      } else if (role === "admin") {
        newUser = await this.adminModel.create({
          ...rest,
          email,
          password: hashedPassword,
          active_link: activationToken,
        });
      } else if (role === "creator") {
        newUser = await this.adminModel.create({
          ...rest,
          email,
          password: hashedPassword,
          active_link: activationToken,
        });
      } else {
        throw new BadRequestException(
          "Ro'yxatdan o'tish jarayonida xato: Noto'g'ri rol"
        );
      }

      if (!newUser.email) {
        console.log(newUser);

        console.error(
          "Xato: Yaratilgan user obyekti yoki uning emaili mavjud emas!"
        );
      }

      console.log(newUser.email);

      await this.mailService.sendActivationLink({
        email: newUser.email,
        token: activationToken,
        name:
          (newUser as any).first_name ||
          (newUser as any).shop_name ||
          "foydalanuvchi",
      });

      // return res.json({
      //   message: `Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi. ${role} hisobingizni faollashtirish uchun emailingizni tekshiring.`,
      // });
      return true;
    }

    async login(loginDto: LoginDto, res: Response) {
      const { email, password, role } = loginDto;

      let user: Customer | Seller | Admin | null = null;

      if (role === "customer") {
        user = await this.CustomerModel.findOne({ where: { email: email } });
      } else if (role === "seller") {
        user = await this.sellerModel.findOne({ where: { email } });
      } else if (role === "admin") {
        user = await this.adminModel.findOne({ where: { email } });
      } else if (role === "creator") {
        user = await this.adminModel.findOne({
          where: { email: email, iscreator: true },
        });
      } else {
        console.log(user);

        throw new BadRequestException("Login uchun yaroqsiz rol");
      }

      if (!user || !user.password) {
        console.log(user?.password, "👨‍💻");

        throw new UnauthorizedException("Email yoki parol noto'g'r👨‍💻i");
      }

      if (role !== "admin" && user.is_active === false) {
        const activationToken = randomUUID();
        await (user as any).update({ active_link: activationToken });
        await this.mailService.sendActivationLink({
          email: user.email,
          token: activationToken,
          name:
            (user as any).first_name ||
            (user as any).shop_name ||
            "foydalanuvchi",
        });
        throw new UnauthorizedException(
          "Hisobingiz faollashtirilmagan. Emailingizni tekshiring."
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException("Email yoki parol noto'g'ri");
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
      await (user as any).update({ hashed_token: hashedToken });

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

      // await this.mailService.sendActivationLink({
      //   email: user.email,
      //   token: user.active_link || randomUUID(),
      //   name:
      //     (user as any).first_name ||
      //     (user as any).shop_name ||
      //     "foydalanuvchi",
      // });

      return res.redirect("/foods/main");
      // return res.json({ access_token, user: { id: user.id, email: user.email, role } });
    }

    async activateUser(
      token: string
    ): Promise<{ message: string; type: string }> {
      let user: Customer | Seller | Admin | null =
        await this.CustomerModel.findOne({
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
        throw new NotFoundException(
          "Token noto‘g‘ri yoki foydalanuvchi topilmadi"
        );
      }

      user.is_active = true;
      user.active_link = "null";
      await user.save();

      return {
        message: "Hisob muvaffaqiyatli faollashtirildi!",
        type: userType,
      };
    }

    async refreshToken(
      refresh_token: string,
      res: Response
    ): Promise<{ access_token: string }> {
      if (!refresh_token) {
        throw new UnauthorizedException("Refresh token topilmadi");
      }

      try {
        const payload = await this.jwtService.verifyAsync(refresh_token, {
          secret: process.env.JWT_REFRESH_SECRET || "refresh-secret-replace-me",
        });

        let user: Customer | Seller | Admin | null = null;

        if (payload.role === "Customer") {
          user = await this.CustomerModel.findByPk(payload.sub);
        } else if (payload.role === "seller") {
          user = await this.sellerModel.findByPk(payload.sub);
        } else if (payload.role === "admin") {
          user = await this.adminModel.findByPk(payload.sub);
        } else {
          throw new UnauthorizedException("Tokenedagi rol yaroqsiz");
        }

        if (!user || !user.hashed_token) {
          throw new UnauthorizedException(
            "Foydalanuvchi topilmadi yoki token yaroqsiz"
          );
        }

        const isTokenMatch = await bcrypt.compare(
          refresh_token,
          user.hashed_token
        );

        if (!isTokenMatch) {
          throw new UnauthorizedException("Refresh token noto'g'ri");
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
        await (user as any).update({ hashed_token: hashedToken }); // <-- Tuzatish

        res.cookie("refresh_token", new_refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { access_token: new_access_token };
      } catch (error) {
        throw new UnauthorizedException("Yaroqsiz refresh token");
      }
    }
  }