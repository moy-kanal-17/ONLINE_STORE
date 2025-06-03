import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AdminService } from "../../admin/admin.service";
import { CustomerService } from "../../customer/customer.service";
import { SellerService } from "../../seller/seller.service";

@Injectable()
export class TokenFreshnessGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private customerService: CustomerService,
    private sellerService: SellerService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = request.cookies["access_token"];

    if (!token) {
      console.error("Cookie-fayllarda hech qanday access_token topilmadi!");
      response.redirect("/auth/login");
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
      });
      request["user"] = payload;

      const userId = payload.sub;
      const role = payload.role;

      const user = await this.getUser(userId, role);
      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi!");
      }

      const issuedAt = payload.iat * 1000;
      const maxAge = 60 * 60 * 1000; 
      if (Date.now() - issuedAt > maxAge) {
        throw new UnauthorizedException("Token eskirgan, qayta kiring!");
      }

      return true;
    } catch (err) {
      console.error("TokenFreshnessGuard HATO:", err.message);
      response.redirect("/auth/login");
      return false;
    }
  }

  private async getUser(id: string, role: string) {
    switch (role) {
      case "admin":
        return await this.adminService.findOne(+id);
      case "customer":
        return await this.customerService.findOne(+id);
      case "seller":
        return await this.sellerService.findOne(+id);
      default:
        throw new UnauthorizedException(`Noma'lum rol: ${role}`);
    }
  }
}
