import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "src/customer/customer.service";
export declare class ActiveUserGuard implements CanActivate {
    private jwtService;
    private readonly CustomerService;
    constructor(jwtService: JwtService, CustomerService: CustomerService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getUser;
}
