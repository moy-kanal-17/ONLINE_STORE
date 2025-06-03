import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = request.cookies['access_token']; 

    if (!token) {
        console.log(token);
        
      response.redirect('/auth/login'); 
      return false;
    }

    try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_ACCESS_SECRET || 'access-secret-replace-me',
        });
          
      request['user'] = payload;
      return true;
    } catch (err) {
        console.log(err);
        
      response.redirect('/auth/login');
      return false;
    }
  }
}
