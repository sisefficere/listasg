import { CardAnunciantes } from "$/src/lib/components/molecules/card-anunciantes/card-anunciantes";
import prisma from "$/src/lib/prisma";

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
      <div>
        <div className="flex flex-col w-full items-center">
          <h2 className="tipo-titulo2">Classificados em "{categoria.nome}"</h2>
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
                  <a key={el.id} href={`/subcategoria/${el.id}`}>
                    <div className="px-5 py-2 text-white transition-all duration-300 hover:bg-azul-2-principal hover:border-azul-1-escuro bg-azul-1-escuro border-azul-2-principal rounded-[5px] border-2 flex gap-[10px]">
                      <svg
                        enable-background="new 0 0 32 32"
                        id="Glyph"
                        version="1.1"
                        viewBox="0 0 32 32"
                        className="fill-white w-full max-w-[15px]"
                      >
                        <path
                          d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
                          id="XMLID_294_"
                        />
                        <path
                          d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
                          id="XMLID_295_"
                        />
                        <path
                          d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
                          id="XMLID_297_"
                        />
                      </svg>
                      <p>{el.nome}</p>
                    </div>
                  </a>
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
