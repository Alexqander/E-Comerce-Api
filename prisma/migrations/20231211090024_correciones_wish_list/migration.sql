/*
  Warnings:

  - Added the required column `quantity` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "quantity" INTEGER NOT NULL;
