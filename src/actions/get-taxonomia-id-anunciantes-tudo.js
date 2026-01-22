"use server";
import prisma from "@utils/prisma";

export default async function getTaxonomiaIdAnunciantesTudo(id) {
  const idInt = parseInt(id);
  const anunciantes = await prisma.taxonomia.findUnique({
    select: {
      nome: true,
      anunciantes: {
        orderBy: {
          slug: "asc",
        },
      },
    },
    where: {
      id: idInt,
    },
  });

  return anunciantes;
}
