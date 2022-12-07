/*
  Warnings:

  - Added the required column `num` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "num" INTEGER NOT NULL;
