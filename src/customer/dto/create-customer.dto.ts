import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ enum: ["male", "female", "other"], required: false })
  @IsOptional()
  @IsEnum(["male", "female", "other"])
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthday?: Date;
}
