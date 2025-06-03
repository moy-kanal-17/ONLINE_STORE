// // src/auth/guards/geo-restricted.guard.ts
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   BadRequestException,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { Request, Response } from "express";
// import { AdminService } from "../../admin/admin.service";
// import { CustomerService } from "../../customer/customer.service";
// import { SellerService } from "../../seller/seller.service";

// @Injectable()
// export class GeoRestrictedGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private adminService: AdminService,
//     private customerService: CustomerService,
//     private sellerService: SellerService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const response = context.switchToHttp().getResponse<Response>();
//     const token = request.cookies["access_token"];

//     if (!token) {
//       console.error("Cookie-fayllarda hech qanday access_token topilmadi!");
//       response.redirect("/auth/login");
//       return false;
//     }

//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
//       });
//       request["user"] = payload;

//       const userId = payload.sub;
//       const role = payload.role;

//       const user = await this.getUser(userId, role);
//       if (!user) {
//         throw new UnauthorizedException("Foydalanuvchi topilmadi!");
//       }

//       const allowedRegions = ["UZ", "RU"];
//       if (!allowedRegions.includes(user.address)) {
//         throw new ForbiddenException(
//           "Sizning hududingizda kirish taqiqlangan!"
//         );
//       }

//       return true;
//     } catch (err) {
//       console.error("GeoRestrictedGuard HATO:", err.message);
//       response.redirect("/auth/login");
//       return false;
//     }
//   }

//   private async getUser(id: string, role: string) {
//     switch (role) {
//       case "customer":
//         return await this.customerService.findOne(+id);
//       default:
//         throw new UnauthorizedException(`Noma'lum rol: ${role}`);
//     }
//   }
// }
