"use server";
import prisma from "@utils/prisma";

export default async function getAnunciantes(select = null) {
  let anunciantes;

  if (select) {
    anunciantes = await prisma.anunciantes.findMany({
      select,
      orderBy: {
        slug: "asc",
      },
    });
  } else {
    anunciantes = await prisma.anunciantes.findMany({
      orderBy: {
        slug: "asc",
      },
    });
  }

  return anunciantes;
}
