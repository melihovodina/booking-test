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
      select: { id: true }
    });
   
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    name?: string;
    email?: string;
  }) {
    const { skip = 0, take, name, email } = params;

    const where: any = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };

    return this.prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(params: { id?: number; email?: string }) {
    let user;

    if (params.id) {
      user = await this.prisma.user.findUnique({ where: { id: params.id } });
    } else if (params.email) {
      user = await this.prisma.user.findUnique({ where: { email: params.email } });
    } else {
      throw new NotFoundException('No identifier provided');
    }

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: { id: true } 
    });
    
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
        select: { id: true }
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
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: { id: true } 
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}