'use server'
import prisma from "$/src/lib/prisma";

export default async function consultaCategorias(cursorId) {
    let categorias = [];

    if(cursorId){
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
            nome: "asc",
          },
        });
    }else{
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
            nome: "asc",
          },
        });
    }

    return categorias;
  }