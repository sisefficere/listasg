-- CreateTable
CREATE TABLE "anunciantes" (
    "id" SERIAL NOT NULL,
    "nome_empresa" TEXT,
    "descricao" TEXT,
    "endereco" TEXT,
    "contato" TEXT,
    "src_image" TEXT,
    "categoria" INTEGER,
    "subcategoria" INTEGER,

    CONSTRAINT "inicial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "classificacao" INTEGER,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classificacoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "classificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "categoria" INTEGER,

    CONSTRAINT "subcategorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inicial_nome_empresa_key" ON "anunciantes"("nome_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "classificacoes_nome_key" ON "classificacoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "subcategorias_nome_key" ON "subcategorias"("nome");

-- AddForeignKey
ALTER TABLE "anunciantes" ADD CONSTRAINT "ref_categoria" FOREIGN KEY ("categoria") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anunciantes" ADD CONSTRAINT "ref_subcategoria" FOREIGN KEY ("subcategoria") REFERENCES "subcategorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "classificacao" FOREIGN KEY ("classificacao") REFERENCES "classificacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subcategorias" ADD CONSTRAINT "categoria" FOREIGN KEY ("categoria") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

