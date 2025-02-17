/*
  Warnings:

  - The primary key for the `verification_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identifier` on the `verification_tokens` table. All the data in the column will be lost.
  - Added the required column `email` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_pkey",
DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id", "token");
