/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullPrice" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "screen" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "images" TEXT[],
    "colorsAvailable" TEXT[],
    "capacityAvailable" TEXT[],
    "description" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "cell" TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
