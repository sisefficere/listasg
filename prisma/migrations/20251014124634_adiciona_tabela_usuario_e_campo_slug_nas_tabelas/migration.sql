/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `anunciantes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `classificacoes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `subcategorias` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `classificacoes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `subcategorias` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."anunciantes" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "public"."categorias" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "nome" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."classificacoes" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "nome" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."subcategorias" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "nome" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "anunciantes_slug_key" ON "public"."anunciantes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "public"."categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "classificacoes_slug_key" ON "public"."classificacoes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "subcategorias_slug_key" ON "public"."subcategorias"("slug");
