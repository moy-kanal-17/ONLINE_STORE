
// admin.dto.ts
import { IsString, IsEmail, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the admin' })
  @IsString()
  @MinLength(2)
  full_name: string;

  @ApiProperty({ example: 'admin@example.com', description: 'Email address of the admin' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'johndoe', description: 'Username of the admin (optional)' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'password123', description: 'Password for the admin' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: true, description: 'Is the admin active?' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Is the admin a creator?' })
  @IsOptional()
  @IsBoolean()
  iscreator?: boolean;
}

export class UpdateAdminDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the admin' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  full_name?: string;

  @ApiPropertyOptional({ example: 'admin@example.com', description: 'Email address of the admin' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'johndoe', description: 'Username of the admin' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'New password for the admin' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: true, description: 'Is the admin active?' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Is the admin a creator?' })
  @IsOptional()
  @IsBoolean()
  iscreator?: boolean;

  @ApiPropertyOptional({ example: 'token123', description: 'Hashed token for the admin' })
  @IsOptional()
  @IsString()
  hashed_token?: string;

  @ApiPropertyOptional({ example: 'link123', description: 'Active link for the admin' })
  @IsOptional()
  @IsString()
  active_link?: string;
}

export class FilterAdminDto {
  @ApiPropertyOptional({ example: 'admin@example.com', description: 'Filter by email (partial match)' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: true, description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Filter by creator status' })
  @IsOptional()
  @IsBoolean()
  iscreator?: boolean;

  @ApiPropertyOptional({ example: 'full_name', description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  sort_by?: string;

  @ApiPropertyOptional({ example: 'ASC', description: 'Sort order (ASC or DESC)' })
  @IsOptional()
  @IsString()
  sort_order?: 'ASC' | 'DESC';
}
