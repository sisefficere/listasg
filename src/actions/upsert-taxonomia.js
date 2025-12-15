"use server";
import prisma from "@utils/prisma";

export default async function upsertTaxonomia(id, dados) {
  const dadosTaxonomia = {
    nome: dados.nome,
    slug: dados.slug,
    descricao: dados.descricao,
    parentId: Number.parseInt(dados.parentId)
  };

  const where = id ? {id} : {id: 9999999}


  await prisma.taxonomia.upsert({
    where,
    update: dadosTaxonomia,
    create: dadosTaxonomia,
  });
}
