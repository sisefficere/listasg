"use server";
import prisma from "@utils/prisma";

export default async function upsertTaxonomia(id, dados) {
  const dadosTaxonomia = {
    id: dados.id,
    nome: dados.nome,
    slug: dados.slug,
    descricao: dados.descricao,
    parent: Number.parseInt(dados.parent),
    children: Number.parseInt(dados.children),
    anunciantes: dados.anunciantes,
  };

  await prisma.taxonomia.upsert({
    where: {
      id,
    },
    update: dadosTaxonomia,
    create: dadosTaxonomia,
  });
}
