import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterPatientAuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  birthday?: Date;
}
