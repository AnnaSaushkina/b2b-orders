-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "characteristics" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
