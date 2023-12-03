/*
  Warnings:

  - You are about to drop the column `exteriorNumber` on the `ShippingDirections` table. All the data in the column will be lost.
  - You are about to drop the column `interiorNumber` on the `ShippingDirections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShippingDirections" DROP COLUMN "exteriorNumber",
DROP COLUMN "interiorNumber";
