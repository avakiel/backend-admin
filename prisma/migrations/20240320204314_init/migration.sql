-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityAvailable" JSONB NOT NULL,
    "capacity" TEXT NOT NULL,
    "priceRegular" DECIMAL(65,30) NOT NULL,
    "priceDiscount" DECIMAL(65,30) NOT NULL,
    "colorsAvailable" JSONB NOT NULL,
    "color" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "screen" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "camera" TEXT NOT NULL,
    "zoom" TEXT NOT NULL,
    "cell" JSONB NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);
