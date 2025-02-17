/*
  Warnings:

  - The primary key for the `verification_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `verification_tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `resetPasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id", "token");

-- DropTable
DROP TABLE "resetPasswordToken";

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id","token")
);
