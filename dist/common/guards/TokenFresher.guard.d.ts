import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../../admin/admin.service";
import { CustomerService } from "../../customer/customer.service";
import { SellerService } from "../../seller/seller.service";
export declare class TokenFreshnessGuard implements CanActivate {
    private jwtService;
    private adminService;
    private customerService;
    private sellerService;
    constructor(jwtService: JwtService, adminService: AdminService, customerService: CustomerService, sellerService: SellerService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getUser;
}
