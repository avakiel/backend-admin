/*
  Warnings:

  - Added the required column `itemId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "itemId" TEXT NOT NULL;
