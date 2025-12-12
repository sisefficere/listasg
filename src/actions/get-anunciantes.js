"use server";
import prisma from "@utils/prisma";

export default async function getAnunciantes(select = null) {
  const anunciantes = await prisma.anunciantes.findMany({
      select,
      orderBy: {
        slug: "asc",
      },
    });

  return anunciantes;
}
