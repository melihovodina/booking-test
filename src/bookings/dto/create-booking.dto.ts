import { Prisma } from "@prisma/client";
import { IsInt, IsOptional, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto implements Prisma.BookingUncheckedCreateInput {
  @ApiProperty({ example: 1, description: 'ID of the event' })
  @IsInt()
  event_id: number;

  @ApiProperty({ example: 42, description: 'ID of the user' })
  @IsInt()
  user_id: number;
}
