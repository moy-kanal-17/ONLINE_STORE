// src/auth/guards/active-user.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { CustomerService } from "src/customer/customer.service";

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly CustomerService: CustomerService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = request.cookies["access_token"];

    if (!token) {
      response.redirect("/auth/login");
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
      });
      request["user"] = payload;

      const user = await this.CustomerService.findOne(payload.sub);
      if (!user?.is_active) {
        throw new ForbiddenException("Your account is not active");
      }

      return true;
    } catch (err) {
      console.error("ActiveUserGuard error:", err);
      response.redirect("/auth/login");
      return false;
    }
  }

  private async getUser(id: number) {
    return { id, isActive: true }; 
  }
}
