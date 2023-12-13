/*
  Warnings:

  - You are about to drop the column `ordersId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shoppingCartId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wishListId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingCartId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_wishListId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ordersId",
DROP COLUMN "shoppingCartId",
DROP COLUMN "wishListId";

-- CreateTable
CREATE TABLE "_ProductShoppingCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductWishList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductOrders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductShoppingCart_AB_unique" ON "_ProductShoppingCart"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductShoppingCart_B_index" ON "_ProductShoppingCart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductWishList_AB_unique" ON "_ProductWishList"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductWishList_B_index" ON "_ProductWishList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductOrders_AB_unique" ON "_ProductOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductOrders_B_index" ON "_ProductOrders"("B");

-- AddForeignKey
ALTER TABLE "_ProductShoppingCart" ADD CONSTRAINT "_ProductShoppingCart_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductShoppingCart" ADD CONSTRAINT "_ProductShoppingCart_B_fkey" FOREIGN KEY ("B") REFERENCES "ShoppingCart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductWishList" ADD CONSTRAINT "_ProductWishList_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductWishList" ADD CONSTRAINT "_ProductWishList_B_fkey" FOREIGN KEY ("B") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrders" ADD CONSTRAINT "_ProductOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrders" ADD CONSTRAINT "_ProductOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
