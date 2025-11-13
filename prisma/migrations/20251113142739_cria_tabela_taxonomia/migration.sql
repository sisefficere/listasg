/*
  Warnings:

  - You are about to drop the column `classId` on the `anunciantes` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `classificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `classificacoes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."anunciantes" DROP CONSTRAINT "ref_classificacao";

-- DropForeignKey
ALTER TABLE "public"."classificacoes" DROP CONSTRAINT "classificacoes_parentId_fkey";

-- AlterTable
ALTER TABLE "public"."anunciantes" DROP COLUMN "classId";

-- AlterTable
ALTER TABLE "public"."categorias" ADD COLUMN     "classificacao" INTEGER;

-- AlterTable
ALTER TABLE "public"."classificacoes" DROP COLUMN "descricao",
DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "public"."taxonomia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT,
    "classificacao" INTEGER,
    "descricao" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "taxonomia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "taxonomia_nome_key" ON "public"."taxonomia"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "taxonomia_slug_key" ON "public"."taxonomia"("slug");

-- AddForeignKey
ALTER TABLE "public"."categorias" ADD CONSTRAINT "classificacao" FOREIGN KEY ("classificacao") REFERENCES "public"."classificacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."taxonomia" ADD CONSTRAINT "taxonomia_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."taxonomia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
