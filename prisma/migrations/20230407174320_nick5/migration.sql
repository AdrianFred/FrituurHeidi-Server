/*
  Warnings:

  - You are about to drop the `product_options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_options" DROP CONSTRAINT "product_options_optionId_fkey";

-- DropForeignKey
ALTER TABLE "product_options" DROP CONSTRAINT "product_options_productId_fkey";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "product_options";

-- CreateTable
CREATE TABLE "Product_Option" (
    "productId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_Option_pkey" PRIMARY KEY ("productId","optionId")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Option" ADD CONSTRAINT "Product_Option_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Option" ADD CONSTRAINT "Product_Option_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
