/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripeId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethod` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "paymentMethodId",
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "stripeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PaymentMethod";

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_stripeId_key" ON "Transactions"("stripeId");
