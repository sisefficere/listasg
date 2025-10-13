"use server";
import prisma from "$/src/lib/prisma";

export default async function getSubcategorias(slugInt, cursorId, voltar) {
  let subCategorias = [];

  if (cursorId) {
    if (voltar) {
      subCategorias = await prisma.subcategorias.findMany({
        take: -10,
        cursor: {
          id: cursorId,
        },
        where: {
          categoria: slugInt,
          anunciantes: {
            some: {},
          },
        },
        orderBy: {
          nome: "asc",
        },
      });
    } else {
      subCategorias = await prisma.subcategorias.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: cursorId,
        },
        where: {
          categoria: slugInt,
          anunciantes: {
            some: {},
          },
        },
        orderBy: {
          nome: "asc",
        },
      });
    }
  } else {
    subCategorias = await prisma.subcategorias.findMany({
      take: 10,
      where: {
        categoria: slugInt,
        anunciantes: {
          some: {},
        },
      },
      orderBy: {
        nome: "asc",
      },
    });
  }

  return subCategorias;
}
