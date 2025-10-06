import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
   
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user) throw new NotFoundException('User not found');
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      
      if (existing && existing.id !== id) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}