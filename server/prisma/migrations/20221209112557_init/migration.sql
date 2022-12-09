/*
  Warnings:

  - The `table` column on the `Reserve` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "table",
ADD COLUMN     "table" TEXT;

-- DropEnum
DROP TYPE "Table";
