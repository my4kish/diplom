/*
  Warnings:

  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - Made the column `status` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ALTER COLUMN "status" SET NOT NULL;
