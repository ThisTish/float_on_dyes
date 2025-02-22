/*
  Warnings:

  - The primary key for the `WishList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_pkey",
ADD CONSTRAINT "WishList_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_key" ON "WishList"("userId");
