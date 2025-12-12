"use server";
import prisma from "@utils/prisma";

export default async function upsertTaxonomia(id, dados) {
  const dadosTaxonomia = {
    nome: dados.nome,
    slug: dados.slug,
    descricao: dados.descricao,
    parentId: Number.parseInt(dados.parentId)
  };

  await prisma.taxonomia.upsert({
    where: {
      id,
    },
    update: dadosTaxonomia,
    create: dadosTaxonomia,
  });
}
