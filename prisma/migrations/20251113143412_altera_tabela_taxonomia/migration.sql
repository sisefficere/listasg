-- AlterTable
ALTER TABLE "public"."anunciantes" ADD COLUMN     "taxonomia" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."anunciantes" ADD CONSTRAINT "ref_taxonomia" FOREIGN KEY ("taxonomia") REFERENCES "public"."taxonomia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
