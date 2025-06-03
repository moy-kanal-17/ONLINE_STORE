import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNumber,
} from "class-validator";
import { Is } from "sequelize-typescript";

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;


  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  adress?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
