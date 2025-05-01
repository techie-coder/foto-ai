/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `Ethnicity` will be removed. If these variants are still used in the database, this will fail.
  - The values [Others] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Ethnicity_new" AS ENUM ('White', 'Black', 'Asian_American', 'East_Asian', 'South_East_Asian', 'South_Asian', 'Middle_Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethnicity" TYPE "Ethnicity_new" USING ("ethnicity"::text::"Ethnicity_new");
ALTER TYPE "Ethnicity" RENAME TO "Ethnicity_old";
ALTER TYPE "Ethnicity_new" RENAME TO "Ethnicity";
DROP TYPE "Ethnicity_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ModelTypeEnum_new" AS ENUM ('Man', 'Woman', 'Other');
ALTER TABLE "Model" ALTER COLUMN "type" TYPE "ModelTypeEnum_new" USING ("type"::text::"ModelTypeEnum_new");
ALTER TYPE "ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "ModelTypeEnum_old";
COMMIT;
