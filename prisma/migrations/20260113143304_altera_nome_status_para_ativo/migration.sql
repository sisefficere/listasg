/*
  Warnings:

  - You are about to drop the column `status` on the `anunciantes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "anunciantes" DROP COLUMN "status",
ADD COLUMN     "ativo" BOOLEAN;
