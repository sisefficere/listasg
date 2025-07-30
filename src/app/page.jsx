import prisma from "$/src/lib/prisma";
import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import Pesquisa from "$/src/lib/components/molecules/pesquisa/pesquisa";
import { Suspense } from "react";
import ResultadoPesquisa from "../lib/components/molecules/resultado-pesquisa/resultado-pesquisa";
import ResultadoPesquisaPlaceholder from "../lib/components/molecules/resultado-pesquisa/--placeholder/resultado-pesquisa--placeholder";

export const metadata = {
  title: "ListaSG Classificados",
  description: "Aqui você encontra o que precisa",
};

export default async function Home({ searchParams }) {
  const pesquisa = await searchParams;
  const query = pesquisa?.query || "";
  const currentPage = Number(pesquisa?.page) || 1;
  const categorias = await prisma.categorias.findMany({
    where: {
      OR: [
        {
          //TODO: CONSIDERAR COMO VALIDAS SUBCATEGORIAS COM CLASSIFICADOS
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

  return (
    <div className="flex flex-col items-center justify-center gap-[25px] estrutura-padding">
      <div className="flex flex-col w-full items-center">
        <h1 className="tipo-titulo1">Bem vindo(a)!</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 justify-center h-full w-full">
          <Pesquisa />
          <Suspense
            key={query + currentPage}
            fallback={
              <>
                <ResultadoPesquisaPlaceholder />
              </>
            }
          >
            <ResultadoPesquisa query={query} currentPage={currentPage} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-2">
          <p className="tipo-enfase">Ou escolha uma categoria:</p>
          <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-[10px] w-full">
            {categorias.map((el) => (
              <BulletItem
                key={el.id}
                href={`/categoria/${el.id}`}
                nome={el.nome}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
