/*
  Warnings:

  - You are about to drop the column `packsId` on the `PackPrompts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PackPrompts" DROP CONSTRAINT "PackPrompts_packsId_fkey";

-- AlterTable
ALTER TABLE "PackPrompts" DROP COLUMN "packsId";

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
