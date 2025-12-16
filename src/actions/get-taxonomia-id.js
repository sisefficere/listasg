"use server";
import prisma from "@utils/prisma";

export default async function getTaxonomiaId(id, somenteNome = false) {
  let taxonomia;

  if (somenteNome) {
    taxonomia = await prisma.taxonomia.findUnique({
      where: {
        id,
      },
      select: {
        nome: true,
      },
    });
  } else {
    taxonomia = await prisma.taxonomia.findUnique({
      where: {
        id,
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
