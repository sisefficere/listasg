import { CardAnunciantes } from "$/src/lib/components/molecules/card-anunciantes/card-anunciantes";
import prisma from "$/src/lib/prisma";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
  const slugInt = parseInt(slug);

  const subcategoria = await prisma.subcategorias.findUnique({
    where: { id: slugInt },
    select: {
      nome: true,
      categoria: true
    },
  });
  const categoria = await prisma.categorias.findUnique({
    where: { id: subcategoria.categoria },
    select: {
      nome: true,
    },
  });

  return {
    title: `${categoria.nome} > ${subcategoria.nome} - ${process.env.TITULO}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const subcategoria = await prisma.subcategorias.findUnique({
    where: { id: slugInt },
  });
  const categoria = await prisma.categorias.findUnique({
    where: { id: subcategoria.categoria },
  });
  const anunciantes = await prisma.anunciantes.findMany({
    where: { subcategoria: slugInt },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding">
      <div>
        <div className="flex flex-col w-full items-center">
          <h2 className="tipo-titulo2">
            Classificados em "{categoria.nome} {">"} {subcategoria.nome}"
          </h2>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-5 w-full ">
          {anunciantes.length != 0 ? (
            anunciantes.map((el) => (
              <CardAnunciantes
                key={el.id}
                srcImage={el.src_image}
                nome={el.nome_empresa}
                descricao={el.descricao}
                endereco={el.endereco}
                contato={el.telefone}
              />
            ))
          ) : (
            <></>
          )}
          <a href="/" className="underline">
            Volte para o início
          </a>
        </div>
      </div>
    </div>
  );
}
