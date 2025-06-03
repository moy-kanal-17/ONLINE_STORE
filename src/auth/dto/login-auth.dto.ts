import { IsEmail, IsString, MinLength, IsIn } from '@nestjs/class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['seller', 'customer', 'admin'])
  role: 'seller' | 'customer' | 'admin';
}
