import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AdminhGuard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
