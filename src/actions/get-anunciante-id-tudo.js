"use server";
import prisma from "@utils/prisma";

export default async function getAnuncianteIdTudo(slugInt) {
    const idInt = parseInt(slugInt);
  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: idInt },
  });

  return anunciante;
}
