"use server";
import prisma from "$/src/lib/prisma";

export default async function getCategoriasOffset(page, perPage) {
  let categorias = [];

  const query = {
    take: perPage,
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
  })

  if (page !== 1) {
      categorias = await prisma.categorias.findMany({
        skip: (page-1)*perPage,
        ...query
      });
  } else {
    categorias = await prisma.categorias.findMany({
      skip: 0,
      ...query
    });
  }


  return {
    categorias, totalCategorias
  };
}
