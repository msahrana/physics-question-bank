/*
  Warnings:

  - A unique constraint covering the columns `[chapterId,questionNo]` on the table `cq_questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionNo` to the `cq_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cq_questions" ADD COLUMN     "questionNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cq_questions_chapterId_questionNo_key" ON "cq_questions"("chapterId", "questionNo");
