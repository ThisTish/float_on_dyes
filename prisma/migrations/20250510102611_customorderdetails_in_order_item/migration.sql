-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "customOrderDetails" JSON,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
