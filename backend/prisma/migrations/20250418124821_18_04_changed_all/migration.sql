/*
  Warnings:

  - You are about to alter the column `description` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `title` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(22)`.
  - You are about to alter the column `description` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "title" SET DATA TYPE VARCHAR(22),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'new';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "role" SET DEFAULT 'employee';
