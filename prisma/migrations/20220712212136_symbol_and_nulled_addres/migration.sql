-- AlterTable
ALTER TABLE "Waitlist" ADD COLUMN     "symbol" TEXT,
ALTER COLUMN "contractAddress" DROP NOT NULL;
