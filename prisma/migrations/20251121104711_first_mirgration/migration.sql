-- CreateTable
CREATE TABLE "shortLink" (
    "id" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastClickedAt" TIMESTAMP(3),
    "clickCount" INTEGER NOT NULL DEFAULT 8,

    CONSTRAINT "shortLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortLink_shortCode_key" ON "shortLink"("shortCode");

-- CreateIndex
CREATE INDEX "shortLink_userId_idx" ON "shortLink"("userId");
