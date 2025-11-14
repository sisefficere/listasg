"use server";
import prisma from "@utils/prisma";

export default async function getTaxonomia(select = null, somenteNome = false) {
  let taxonomia;

  if (select) {
    taxonomia = await prisma.taxonomia.findMany({
      select,
      orderBy: {
        slug: "asc",
      },
    });
  } else {
    if (somenteNome) {
      taxonomia = await prisma.taxonomia.findMany({
        select: {
          id: true,
          nome: true,
        },
        orderBy: {
          slug: "asc",
        },
      });
    } else {
      taxonomia = await prisma.taxonomia.findMany({
        orderBy: {
          slug: "asc",
        },
      });
    }
  }

  return taxonomia;
}
