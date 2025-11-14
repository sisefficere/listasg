"use server";
import prisma from "@utils/prisma";

export default async function getAnunciantesId(id) {
  let anunciante;

  anunciante = await prisma.anunciantes.findUnique({
    where:{
      id
    },
    include:{
      taxonomias: true
    }
  });
  // if (select) {
  // } else {
  //   anunciantes = await prisma.anunciantes.findMany({
  //     orderBy: {
  //       slug: "asc",
  //     },
  //   });
  // }

  return anunciante;
}
