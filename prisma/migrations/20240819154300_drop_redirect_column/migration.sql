/*
  Warnings:

  - You are about to drop the column `redirect` on the `Notification` table. All the data in the column will be lost.
  - Made the column `content` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "redirect",
ALTER COLUMN "content" SET NOT NULL;
