-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('HELD', 'RELEASED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MilestoneStatus" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "MilestoneStatus" ADD VALUE 'SUBMITTED';
ALTER TYPE "MilestoneStatus" ADD VALUE 'APPROVED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'DEPOSIT';
ALTER TYPE "TransactionType" ADD VALUE 'RELEASE';

-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "referenceId" INTEGER,
ADD COLUMN     "referenceType" TEXT,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "heldBalance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Escrow" (
    "id" SERIAL NOT NULL,
    "milestoneId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "freelancerId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "EscrowStatus" NOT NULL DEFAULT 'HELD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escrow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_milestoneId_key" ON "Escrow"("milestoneId");

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
