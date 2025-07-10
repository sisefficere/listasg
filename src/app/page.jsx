import prisma from "$/src/lib/prisma";
import { BulletItem } from "../lib/components/molecules/bullet-item/bullet-item";

export const metadata = {
  title: 'ListaSG Classificados',
  description: 'Aqui você encontra o que precisa',
}

export default async function Home() {
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
        <h1 className="tipo-titulo1">Seja bem vindo!</h1>
        <p className="tipo-subtitulo">Escolha uma categoria</p>
      </div>
      <ul className="flex flex-col gap-[10px] w-full ">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categoria/${el.id}`} nome={el.nome}/>
        ))}
      </ul>
    </div>
  );
}
