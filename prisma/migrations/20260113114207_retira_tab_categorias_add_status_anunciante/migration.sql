/*
  Warnings:

  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classificacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "anunciantes" DROP CONSTRAINT "ref_categoria";

-- DropForeignKey
ALTER TABLE "anunciantes" DROP CONSTRAINT "ref_subcategoria";

-- DropForeignKey
ALTER TABLE "categorias" DROP CONSTRAINT "classificacao";

-- DropForeignKey
ALTER TABLE "subcategorias" DROP CONSTRAINT "categoria";

-- AlterTable
ALTER TABLE "anunciantes" ADD COLUMN     "status" BOOLEAN;

-- DropTable
DROP TABLE "categorias";

-- DropTable
DROP TABLE "classificacoes";

-- DropTable
DROP TABLE "subcategorias";
