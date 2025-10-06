import { Prisma } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ example: 'John Doe', description: 'User name', minLength: 3 })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsEmail()
  email: string;
}