/*
  Warnings:

  - You are about to alter the column `priceRegular` on the `Phone` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `priceDiscount` on the `Phone` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- DropIndex
DROP INDEX "Phone_id_key";

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "priceRegular" SET DATA TYPE INTEGER,
ALTER COLUMN "priceDiscount" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Phone_pkey" PRIMARY KEY ("id");
