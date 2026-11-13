/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `cq_parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cq_parts" ADD COLUMN     "label" TEXT NOT NULL,
ALTER COLUMN "marks" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");
