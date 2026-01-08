"use server";
import prisma from "@utils/prisma";

export default async function getTaxonomiaIdAnunciantes(id) {
  const idInt = parseInt(id);
  const anunciantes = await prisma.taxonomia.findUnique({
    select: {
      nome: true,
      anunciantes: {
        select: {
          id: true,
          nome_empresa: true,
        },
      },
    },
    where: {
      id: idInt,
    }
  });

  return anunciantes;
}
