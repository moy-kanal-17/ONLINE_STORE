import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from "@nestjs/class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  shop_name?: string;
}
