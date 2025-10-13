"use server";
import prisma from "$/src/lib/prisma";

export default async function getCategorias(cursorId, voltar) {
  let categorias = [];

  if (cursorId) {
    if (voltar) {
      categorias = await prisma.categorias.findMany({
        take: -10,
        skip: 1,
        cursor: {
          id: cursorId,
        },
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
          id: "asc",
        },
      });
    } else {
      categorias = await prisma.categorias.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: cursorId,
        },
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
          id: "asc",
        },
      });
    }
  } else {
    categorias = await prisma.categorias.findMany({
      take: 10,
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
        id: "asc",
      },
    });
  }

  return {
    categorias,
    cursor: {
      anterior: cursorId,
      proximo: categorias[categorias.length - 1]?.id,
    },
  };
}

