"use server";
import prisma from "@utils/prisma";

export default async function getCategoriasOffset(page, perPage) {
  let categorias = [];

  const query = {
    where: {
      OR: [
        {
          subcategorias: {
            some: {
              anunciantes: {
                some: {},
              },
            },
          },
        },
        {
          anunciantes: {
            some: {},
          },
        },
      ],
    },
    orderBy: {
      nome: "asc",
    },
  };

  const totalCategorias = await prisma.categorias.count({
    ...query
  })

  if (page !== 1) {
      categorias = await prisma.categorias.findMany({
        skip: (page-1)*perPage,
        take: perPage,
        ...query
      });
  } else {
    categorias = await prisma.categorias.findMany({
      skip: 0,
      take: perPage,
      ...query
    });
  }


  return {
    categorias, totalCategorias
  };
}
