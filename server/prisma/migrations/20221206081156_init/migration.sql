/*
  Warnings:

  - You are about to drop the column `tableId` on the `Reserve` table. All the data in the column will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `table` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reserve" DROP CONSTRAINT "Reserve_tableId_fkey";

-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "tableId",
ADD COLUMN     "table" TEXT NOT NULL;

-- DropTable
DROP TABLE "Table";
