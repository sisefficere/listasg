"use server";
import prisma from "@utils/prisma";

export default async function upsertAnunciantes(id, dados) {

  const dadosAnunciante = {
    nome_empresa: dados.nome_empresa,
    slug: dados.slug,
    descricao: dados.descricao,
    endereco: dados.endereco,
    end_ref: dados.end_ref,
    telefone: dados.telefone,
    src_image: dados.src_image,
    categoria: Number.parseInt(dados.categoria),
    subcategoria: Number.parseInt(dados.subcategoria),
    email: dados.email,
    instagram: dados.instagram,
    facebook: dados.facebook,
    whatsapp: dados.whatsapp,
    website: dados.website,
    taxonomia: dados.taxonomia,
    ativo: dados.ativo
  };

  const where = id ? {id} : {id: 9999999}

  await prisma.anunciantes.upsert({
    where,
    update: dadosAnunciante,
    create: dadosAnunciante,
  });
}
