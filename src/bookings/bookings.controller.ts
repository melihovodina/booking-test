import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/reserve')
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Event or User not found' })
  @ApiResponse({ status: 409, description: 'Booking already exists' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiQuery({ name: 'event_id', required: false, type: Number, description: 'Filter by event ID' })
  @ApiQuery({ name: 'user_id', required: false, type: Number, description: 'Filter by user ID' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Number of records to skip' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Number of records to take' })
  @ApiResponse({ status: 200, description: 'List of bookings' })
  findAll(
    @Query('event_id') event_id?: string,
    @Query('user_id') user_id?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.bookingsService.findAll({
      event_id: event_id ? parseInt(event_id, 10) : undefined,
      user_id: user_id ? parseInt(user_id, 10) : undefined,
      skip: skip ? parseInt(skip, 10) : undefined,
      take: take ? parseInt(take, 10) : undefined,
    });
  }
  
  @Get('byIds/:event_id/:user_id')
  @ApiOperation({ summary: 'Get booking by event ID and user ID' })
  @ApiParam({ name: 'event_id', type: Number, description: 'Event ID' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findByEventAndUser(
    @Param('event_id') event_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.bookingsService.findOne({
      event_id: +event_id,
      user_id: +user_id,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findById(@Param('id') id: string) {
    return this.bookingsService.findOne({ id: +id });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
