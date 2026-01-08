"use server";
import prisma from "@utils/prisma";

export default async function getTaxonomiaId(id, somenteNome = false) {
  let taxonomia;

  const idInt = parseInt(id)

  if (somenteNome) {
    taxonomia = await prisma.taxonomia.findUnique({
      where: {
        id: idInt,
      },
      select: {
        nome: true,
      },
    });
  } else {
    taxonomia = await prisma.taxonomia.findUnique({
      where: {
        id: idInt,
      },
      include: {
        parent: {
          select: {
            nome: true,
          },
        },
        children: {
          select: {
            id: true,
            nome: true,
          },
        },
        anunciantes: {
          select: {
            id: true,
            nome_empresa: true,
          },
        },
      },
    });
  }

  return taxonomia;
}
