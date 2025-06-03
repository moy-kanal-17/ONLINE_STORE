import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Injectable()
export class CreatorhGuard implements CanActivate {
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
          secret: process.env.JWT_ACCESS_SECRET || "super-secret",
        });
          
      request.user= payload;
    //   if(!payload.iscreator) {
    //     console.log('User is not an creator');
    //     response.redirect('/auth/login');
    //     return false;
    // }
      if(payload.role !== 'creator') {
        console.log(`User is not an admin:👎${payload.role}`);
        // response.redirect('/auth/login');
      response.json({message:`Access Denied: Invalid token your role:${payload.role}`});

        return false;
      }
      return true;
    } catch (err) {
        console.log(err);
        
      // response.redirect('/auth/login');
      response.send('Access Denied: Invalid token');
      return false;
    }
  }
}
