import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import { CardAnunciantes } from "$/src/lib/components/molecules/card-anunciantes/card-anunciantes";
import prisma from "$/src/lib/prisma";


export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
  const slugInt = parseInt(slug);

  const categoria = await prisma.categorias.findUnique({
    where: { id: slugInt },
    select:{
      nome: true
    }
  });
 
  return {
    title: `${categoria.nome} - ${process.env.TITULO}`
  }
}
 
export default async function Page({ params }) {
  
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const categoria = await prisma.categorias.findUnique({
    where: { id: slugInt },
  });
  const subcategorias = await prisma.subcategorias.findMany({
    where: {
      categoria: slugInt,
      anunciantes: {
        some: {},
      },
    },
  });
  
  const anunciantes = await prisma.anunciantes.findMany({
    where: { categoria: slugInt },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">Classificados em "{categoria.nome}"</h2>
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
                contato={el.contato}
              />
            ))
          ) : (
            <></>
          )}
          {subcategorias.length != 0 ? (
            <div>
              <div className="flex flex-col gap-[10px] w-full ">
                {subcategorias.map((el) => (
                  <BulletItem
                    key={el.id}
                    href={`/subcategoria/${el.id}`}
                    nome={el.nome}
                  />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          {subcategorias.length == 0 && anunciantes.length == 0 ? (
            <div className="flex flex-col items-center gap-[5px]">
              <p>Não encontramos classificados nesta categoria :/</p>
            </div>
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
