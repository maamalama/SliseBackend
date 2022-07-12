/*
  Warnings:

  - You are about to drop the column `processed` on the `TokenHolder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TokenHolder" DROP COLUMN "processed",
ADD COLUMN     "processedBalance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processedTokens" BOOLEAN NOT NULL DEFAULT false;
