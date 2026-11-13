/*
  Warnings:

  - The values [KA,KHA] on the enum `CQPartType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `marks` on the `cq_parts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MCQPartType" AS ENUM ('KA', 'KHA', 'GA', 'GHA');

-- AlterEnum
BEGIN;
CREATE TYPE "CQPartType_new" AS ENUM ('GA', 'GHA', 'UMA', 'CHA', 'CHHA', 'JA', 'JHA', 'NYA', 'TA', 'THA', 'DA', 'DHA', 'NA', 'TA_MURDHANYA', 'THA_MURDHANYA', 'DA_MURDHANYA', 'DHA_MURDHANYA', 'NA_MURDHANYA', 'PA', 'PHA', 'BA', 'BHA', 'MA', 'YA', 'RA', 'LA', 'SHA', 'SSA', 'SA', 'HA');
ALTER TABLE "cq_parts" ALTER COLUMN "type" TYPE "CQPartType_new" USING ("type"::text::"CQPartType_new");
ALTER TYPE "CQPartType" RENAME TO "CQPartType_old";
ALTER TYPE "CQPartType_new" RENAME TO "CQPartType";
DROP TYPE "public"."CQPartType_old";
COMMIT;

-- AlterTable
ALTER TABLE "cq_parts" DROP COLUMN "marks";
