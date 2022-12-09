/*
  Warnings:

  - The `table` column on the `Reserve` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Table" AS ENUM ('B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'C1', 'C2', 'C3');

-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "time" INTEGER,
DROP COLUMN "table",
ADD COLUMN     "table" "Table",
ALTER COLUMN "num" DROP NOT NULL;
