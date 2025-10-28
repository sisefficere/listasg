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
ALTER TABLE "public"."taxonomia" ADD CONSTRAINT "taxonomia_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."taxonomia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
