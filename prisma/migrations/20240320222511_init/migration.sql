/*
  Warnings:

  - The primary key for the `Phone` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Phone_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Phone_id_seq";
