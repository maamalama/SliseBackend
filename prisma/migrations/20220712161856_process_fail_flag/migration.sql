-- AlterTable
ALTER TABLE "TokenHolder" ADD COLUMN     "processedBalanceFail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processedTokensFail" BOOLEAN NOT NULL DEFAULT false;
