import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiPropertyOptional({ example: 'Cool event 2', description: 'Event name', minLength: 3 })
  name?: string;
    
  @ApiPropertyOptional({ example: 150, description: 'Number of total seats' })
  total_seats?: number;
}
