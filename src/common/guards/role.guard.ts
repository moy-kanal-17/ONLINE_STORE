import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleRedirectGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = request.cookies["access_token"];

    if (!token) {
      console.log("Token topilmadi");
      response.redirect("/auth/login");
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
      });

      request["user"] = payload;
      const role = payload.role;
      const path = request.path; 

      if (role === "admin" && path !== "/foods/admin") {
        response.redirect("/foods/admin");
        return false;
      }

      if (role === "seller" && path !== "/foods/seller") {
        response.redirect("/sellers");
        return false;
      }

      if (role === "customer" && path !== "/foods/main") {
        response.redirect("/foods/main");
        return false;
      }

      if (role === "creator" && path !== "/foods/admin") {
        response.redirect("/admins/creator");
        return false;
      }

      return true;
    } catch (err) {
      console.log("Token xato:", err);
      response.redirect("/auth/login");
      return false;
    }
  }
}
