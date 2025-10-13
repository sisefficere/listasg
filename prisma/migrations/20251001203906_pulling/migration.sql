-- CreateTable
CREATE TABLE "public"."anunciantes" (
    "id" SERIAL NOT NULL,
    "nome_empresa" TEXT NOT NULL,
    "descricao" TEXT,
    "endereco" TEXT,
    "telefone" TEXT NOT NULL,
    "src_image" TEXT,
    "categoria" INTEGER,
    "subcategoria" INTEGER,
    "email" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "end_ref" TEXT,

    CONSTRAINT "inicial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "classificacao" INTEGER,
    "descricao" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."classificacoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "classificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subcategorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "categoria" INTEGER,
    "descricao" TEXT,

    CONSTRAINT "subcategorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anunciantes_nome_empresa_key" ON "public"."anunciantes"("nome_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "public"."categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "classificacoes_nome_key" ON "public"."classificacoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "subcategorias_nome_key" ON "public"."subcategorias"("nome");

-- AddForeignKey
ALTER TABLE "public"."anunciantes" ADD CONSTRAINT "ref_categoria" FOREIGN KEY ("categoria") REFERENCES "public"."categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."anunciantes" ADD CONSTRAINT "ref_subcategoria" FOREIGN KEY ("subcategoria") REFERENCES "public"."subcategorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."categorias" ADD CONSTRAINT "classificacao" FOREIGN KEY ("classificacao") REFERENCES "public"."classificacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."subcategorias" ADD CONSTRAINT "categoria" FOREIGN KEY ("categoria") REFERENCES "public"."categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
