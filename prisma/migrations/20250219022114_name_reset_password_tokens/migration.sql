/*
  Warnings:

  - You are about to drop the `ResetPasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ResetPasswordToken";

-- CreateTable
CREATE TABLE "reset_password_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "reset_password_tokens_pkey" PRIMARY KEY ("id","token")
);
