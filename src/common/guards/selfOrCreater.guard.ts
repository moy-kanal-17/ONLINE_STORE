// src/auth/guards/self-or-creator.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AdminService } from "../../admin/admin.service";
import { CustomerService } from "../../customer/customer.service";
import { SellerService } from "../../seller/seller.service";

@Injectable()
export class SelfOrCreatorGuard implements CanActivate {
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
      const resourceId = request.params.id;

      if (!resourceId) {
        throw new BadRequestException("Resource ID si kerak!");
      }

      const resource = await this.getResource(resourceId, role);
      if (!resource) {
        throw new UnauthorizedException("Resource topilmadi!");
      }

      if (resource.id !== userId && role !== "creator") {
        throw new UnauthorizedException(
          "Siz ushbu resursning egasi yoki yaratuvchisi emassiz!"
        );
      }

      return true;
    } catch (err) {
      console.error("SelfOrCreatorGuard HATO:", err.message);
      response.redirect("/auth/login");
      return false;
    }
  }

  private async getResource(id: string, role: string) {
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
