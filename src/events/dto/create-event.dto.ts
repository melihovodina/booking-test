import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEventDto implements Prisma.EventCreateInput {
  @ApiProperty({ example: 'Cool event', description: 'Event name', minLength: 3, maxLength: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;
  
  @ApiProperty({ example: 130, description: 'Number of total seats' })
  @IsNumber()
  total_seats: number;
}
