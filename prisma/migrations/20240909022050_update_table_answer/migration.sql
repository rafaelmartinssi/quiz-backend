/*
  Warnings:

  - You are about to drop the column `correct` on the `answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answer" DROP COLUMN "correct",
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;
