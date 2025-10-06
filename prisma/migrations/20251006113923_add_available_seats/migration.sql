/*
  Warnings:

  - A unique constraint covering the columns `[event_id,user_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available_seats` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "available_seats" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_event_id_idx" ON "Booking"("event_id");

-- CreateIndex
CREATE INDEX "Booking_user_id_idx" ON "Booking"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_event_id_user_id_key" ON "Booking"("event_id", "user_id");
