"use server";
import prisma from "@utils/prisma";

export default async function getCategoriasOffset(page, perPage) {
  let taxonomia = [];

  const query = {
    where: {
      OR: [
        {
          anunciantes: {
            some: {},
          },
        },
      ],
    },
    orderBy: {
      slug: "asc",
    },
  };

  const totalCategorias = await prisma.taxonomia.count({
    ...query
  })

  if (page !== 1) {
      taxonomia = await prisma.taxonomia.findMany({
        skip: (page-1)*perPage,
        take: perPage,
        ...query
      });
  } else {
    taxonomia = await prisma.taxonomia.findMany({
      skip: 0,
      take: perPage,
      ...query
    });
  }


  return {
    taxonomia, totalCategorias
  };
}
