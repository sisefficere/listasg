/*
  Warnings:

  - You are about to drop the column `classificacao` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the `taxonomia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."categorias" DROP CONSTRAINT "classificacao";

-- DropForeignKey
ALTER TABLE "public"."taxonomia" DROP CONSTRAINT "taxonomia_parentId_fkey";

-- AlterTable
ALTER TABLE "public"."anunciantes" ADD COLUMN     "classId" INTEGER;

-- AlterTable
ALTER TABLE "public"."categorias" DROP COLUMN "classificacao";

-- AlterTable
ALTER TABLE "public"."classificacoes" ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "public"."taxonomia";

-- AddForeignKey
ALTER TABLE "public"."anunciantes" ADD CONSTRAINT "ref_classificacao" FOREIGN KEY ("classId") REFERENCES "public"."classificacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."classificacoes" ADD CONSTRAINT "classificacoes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."classificacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
