import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'John Doe', description: 'User name', minLength: 3 })
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'User email' })
  email?: string;
}