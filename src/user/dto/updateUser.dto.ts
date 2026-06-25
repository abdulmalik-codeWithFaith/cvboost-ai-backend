// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional() @IsString() @IsOptional() firstName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() lastName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() location?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() website?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() linkedin?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() github?: string;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  summary?: string;
  @ApiPropertyOptional() @IsOptional() yearsExperience?: number;
}
