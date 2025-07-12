import prisma from "$/src/lib/prisma";
import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import Pesquisa from "$/src/lib/components/molecules/pesquisa/pesquisa";
import { Suspense } from "react";
import ResultadoPesquisa from "../lib/components/molecules/resultado-pesquisa/resultado-pesquisa";

export const metadata = {
  title: 'ListaSG Classificados',
  description: 'Aqui você encontra o que precisa',
}

export default async function Home({searchParams}) {
  const pesquisa = await searchParams
  const query = pesquisa?.query || ''
  const currentPage = Number(pesquisa?.page) || 1
  const categorias = await prisma.categorias.findMany({
    where: {
      OR: [
        {
          //TODO: CONSIDERAR COMO VALIDAS SUBCATEGORIAS COM CLASSIFICADOS
          subcategorias: {
            some: {
              anunciantes:{
                some: {}
              }
            },
          },
        },
        {anunciantes: {
          some: {},
        },}
      ],
    },
    orderBy:{
      nome: 'asc'
    }
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[25px] estrutura-padding">
      <div className="flex flex-col w-full items-center">
        <h1 className="tipo-titulo1">Bem vindo(a)!</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Pesquisa/>
        <Suspense key={query + currentPage} fallback={<><p>Pesquisando ...</p></>}>
          <ResultadoPesquisa query={query} currentPage={currentPage}/>
        </Suspense>
      </div>
      <p>Se desejar, escolha uma categoria abaixo:</p>
      <ul className="flex flex-col gap-[10px] w-full ">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categoria/${el.id}`} nome={el.nome}/>
        ))}
      </ul>
    </div>
  );
}
