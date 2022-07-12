/*
  Warnings:

  - Added the required column `holderId` to the `TokenTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenTransfer" ADD COLUMN     "holderId" TEXT NOT NULL;
