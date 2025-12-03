/*
  Warnings:

  - You are about to drop the column `locations` on the `ShortLink` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ShortLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShortLink" DROP COLUMN "locations",
ADD COLUMN     "LastRedirectLocation" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
