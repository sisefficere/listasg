"use server";
import prisma from "@utils/prisma";

export default async function getAnuncianteNomeId(slugId) {
    const idInt = parseInt(slugId);
  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: idInt },
    select: {
      nome_empresa: true,
    },
  });

  return anunciante;
}
