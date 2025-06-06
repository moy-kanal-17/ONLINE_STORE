  import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Param,
    Get,
    Req,
    Res,
    UnauthorizedException,
    BadRequestException,
    Render,
    UseGuards,
  } from "@nestjs/common";
  import { AuthService } from "./auth.service";
  import { CreateUserDto } from "./dto/create-users.dto";
  import { LoginDto } from "./dto/login-auth.dto";
  import { Request, Response } from "express";
  import { TokenFreshnessGuard } from "src/common/guards/TokenFresher.guard";
  import { JwtAuthGuard } from "src/common/guards/auth.guard";
  import { ActiveUserGuard } from "src/common/guards/ActiveUser.guard";
  import { ThrottlerGuard } from "@nestjs/throttler";

  @Controller("auth")
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register/:role")
    @Render("login")
    @HttpCode(HttpStatus.CREATED)
    async register(
      @Body() createUserDto: CreateUserDto,
      @Param("role") role: "customer" | "seller" | "creator" | "admin",
      @Res() res: Response
    ) {
      if (
        role != "customer" &&
        role !== "seller" &&
        role !== "creator" &&
        role !== "admin"
      ) {
        throw new BadRequestException(
          "Ro'yxatdan o'tish uchun yaroqsiz rol ko'rsatildi"
        );
      }
      const registrationResult = await this.authService.register(
        createUserDto,
        role
      );
      if (registrationResult) {
        return res.render("login");
      } else {
        return res
          .status(400)
          .json({ message: "Roʻyxatdan oʻtishda xatolik yuz berdi" });
      }
    }

    // @UseGuards(ActiveUserGuard)
    @UseGuards(ThrottlerGuard)
    @Post("login")
    async login(
      @Body() loginDto: LoginDto,
      @Res({ passthrough: true }) res: Response
    ) {
      try {
        await this.authService.login(loginDto, res);
        // res.redirect('/foods/main')
      } catch (err) {
        console.log(err);

        return {
          data: loginDto,
          error: err.message || "Loginda xatolik",
        };
      }
    }

    @Post("logout/:id")
    // @UseGuards(TokenFreshnessGuard)
    @UseGuards(JwtAuthGuard)
    logOut(
      @Param("id") id:number,
      @Body("role") role: "customer" | "seller" | "admin" | "creator",
      @Res() res: Response
    ) {
      console.log("Logging out user with ID:", id, "and role:", role);

      const userId = id;
      return this.authService.signout(userId, role, res);
    }

    @Get("registri")
    @Render("registri")
    getRegistriPage() {
      return {
        data: {
          email: "",
          role: "",
        },
        error: null,
      };
    }

    @Get("login")
    @Render("login")
    getLoginPage() {
      return {
        data: {
          email: "",
          role: "",
        },
        error: null,
      };
    }

    @Get("activate/:token")
    @HttpCode(HttpStatus.OK)
    async activateUser(@Param("token") token: string) {
      return this.authService.activateUser(token);
    }

    @Get("refresh")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async refreshToken(
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response
    ) {
      const refresh_token = req.cookies["refresh_token"];
      if (!refresh_token) {
        throw new UnauthorizedException("Refresh token cookie da topilmadi");
      }
      return this.authService.refreshToken(refresh_token, res);
    }
  }
