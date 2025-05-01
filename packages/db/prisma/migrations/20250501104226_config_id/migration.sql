/*
  Warnings:

  - The values [Generated] on the enum `StatusTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTypes_new" AS ENUM ('Pending', 'Completed', 'Failed');
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" DROP DEFAULT;
ALTER TABLE "OutputImages" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" TYPE "StatusTypes_new" USING ("trainingStatus"::text::"StatusTypes_new");
ALTER TABLE "OutputImages" ALTER COLUMN "status" TYPE "StatusTypes_new" USING ("status"::text::"StatusTypes_new");
ALTER TYPE "StatusTypes" RENAME TO "StatusTypes_old";
ALTER TYPE "StatusTypes_new" RENAME TO "StatusTypes";
DROP TYPE "StatusTypes_old";
ALTER TABLE "Model" ALTER COLUMN "trainingStatus" SET DEFAULT 'Pending';
ALTER TABLE "OutputImages" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- CreateIndex
CREATE INDEX "Model_falAiReuestId_idx" ON "Model"("falAiReuestId");

-- CreateIndex
CREATE INDEX "OutputImages_falAiReuestId_idx" ON "OutputImages"("falAiReuestId");
