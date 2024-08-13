/*
  Warnings:

  - You are about to drop the column `description` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `question` table. All the data in the column will be lost.
  - Added the required column `title` to the `answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answer" DROP COLUMN "description",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "question" DROP COLUMN "description",
ADD COLUMN     "title" TEXT NOT NULL;
