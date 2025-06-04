import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Injectable()
export class SellerhGuard implements CanActivate {
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
     

      if(payload.role !== 'seller' && payload.role !== 'admin' && payload.role !== 'creator') {
        console.log('User is not an seller');
        response.redirect('/auth/login');
        return false;
      }
      return true;
    } catch (err) {
        console.log(err);
        
      response.redirect('/auth/login');
      return false;
    }
  }
}
