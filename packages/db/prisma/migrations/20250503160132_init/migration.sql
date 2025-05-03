-- CreateEnum
CREATE TYPE "ModelTypeEnum" AS ENUM ('Man', 'Woman', 'Other');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('White', 'Black', 'Asian_American', 'East_Asian', 'South_East_Asian', 'South_Asian', 'Middle_Eastern', 'Pacific', 'Hispanic');

-- CreateEnum
CREATE TYPE "EyeColor" AS ENUM ('Black', 'Brown', 'Blue', 'Hazel', 'Grey');

-- CreateEnum
CREATE TYPE "StatusTypes" AS ENUM ('Pending', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ModelTypeEnum" NOT NULL,
    "age" INTEGER NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "eyeColor" "EyeColor" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "triggerWord" TEXT,
    "tensorPath" TEXT,
    "trainingStatus" "StatusTypes" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "falAiReuestId" TEXT,
    "zipUrl" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "modelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "status" "StatusTypes" NOT NULL DEFAULT 'Pending',
    "falAiReuestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl1" TEXT NOT NULL DEFAULT '',
    "imageUrl2" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackPrompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Model_falAiReuestId_idx" ON "Model"("falAiReuestId");

-- CreateIndex
CREATE INDEX "OutputImages_falAiReuestId_idx" ON "OutputImages"("falAiReuestId");

-- AddForeignKey
ALTER TABLE "OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
