import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const { event_id, user_id } = createBookingDto;

    const event = await this.prisma.event.findUnique({ 
      where: { id: event_id },
      select: { id: true }
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${event_id} not found`);
    }

    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    const existing = await this.prisma.booking.findUnique({
      where: { event_id_user_id: { event_id, user_id } },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Booking for this user and event already exists');
    }

    return this.prisma.booking.create({
      data: {
        event: { connect: { id: event_id } },
        user: { connect: { id: user_id } },
      },
    });
  }

   async findAll(params?: { skip?: number; take?: number; event_id?: number; user_id?: number }) {
    const { skip, take, event_id, user_id } = params || {};

    return this.prisma.booking.findMany({
      where: {
        event_id: event_id,
        user_id: user_id,
      },
      skip,
      take,
      include: {
        event: true,
        user: true,
      },
    });
  }

  async findOne(params: { id?: number; event_id?: number; user_id?: number }) {
    let booking;

    if (params.id) {
      booking = await this.prisma.booking.findUnique({
        where: { id: params.id },
        include: { event: true, user: true },
      });
    } else if (params.event_id && params.user_id) {
      booking = await this.prisma.booking.findUnique({
        where: {
          event_id_user_id: {
            event_id: params.event_id,
            user_id: params.user_id,
          },
        },
        include: { event: true, user: true },
      });
    } else {
      throw new NotFoundException('No identifier provided');
    }

    if (!booking) throw new NotFoundException('Booking not found');
    
    return booking;
  }


  async remove(id: number) {
    const booking = await this.prisma.booking.findUnique({ 
      where: { id },
      select: { id: true }
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    return this.prisma.booking.delete({ where: { id } });
  }
}
