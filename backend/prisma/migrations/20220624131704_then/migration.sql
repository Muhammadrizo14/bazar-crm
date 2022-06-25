/*
  Warnings:

  - You are about to drop the column `product_count_id` on the `product` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `product_count` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_product_count_id_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_count_id`;

-- AlterTable
ALTER TABLE `product_count` ADD COLUMN `product_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product_count` ADD CONSTRAINT `product_count_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
