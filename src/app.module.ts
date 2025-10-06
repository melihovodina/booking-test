import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsersModule, 
    EventsModule, 
    BookingsModule, 
    PrismaModule
  ]
})
export class AppModule {}
