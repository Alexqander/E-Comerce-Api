/*
  Warnings:

  - You are about to drop the `_ProductOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductShoppingCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductWishList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductOrders" DROP CONSTRAINT "_ProductOrders_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductOrders" DROP CONSTRAINT "_ProductOrders_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductShoppingCart" DROP CONSTRAINT "_ProductShoppingCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductShoppingCart" DROP CONSTRAINT "_ProductShoppingCart_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductWishList" DROP CONSTRAINT "_ProductWishList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductWishList" DROP CONSTRAINT "_ProductWishList_B_fkey";

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductOrders";

-- DropTable
DROP TABLE "_ProductShoppingCart";

-- DropTable
DROP TABLE "_ProductWishList";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishListItem" (
    "id" TEXT NOT NULL,
    "wishListId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "note" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "ShoppingCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
