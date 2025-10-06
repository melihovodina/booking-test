import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll(params?: { name?: string; skip?: number; take?: number }) {
    const { name, skip, take } = params || {};

    return this.prisma.event.findMany({
      where: name ? { name: { contains: name, mode: 'insensitive' } } : {},
      skip: skip,
      take: take,
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({ 
      where: { id },
      select: { id: true }
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    const event = await this.prisma.event.findUnique({ 
      where: { id },
      select: { id: true }
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.event.delete({
      where: { id },
    });
  }
}
