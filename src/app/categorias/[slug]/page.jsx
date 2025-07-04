import prisma from "$/src/lib/prisma";

export default async function Page({ params }) {
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const subcategorias = await prisma.subcategorias.findMany({
    where: { categoria: slugInt },
  });
  const categoria = await prisma.categorias.findUnique({
    where: { id: slugInt },
  });
  const anunciantes = await prisma.anunciantes.findMany({
    where: { categoria: slugInt },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding">
      <div>
        <div className="flex flex-col w-full items-center">
          <h2 className="tipo-titulo2">Classificados em "{categoria.nome}"</h2>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-5 w-full ">
          {anunciantes.length != 0 ? (
            anunciantes.map((el) => (
              <div
                key={el.id}
                className="px-5 py-2 w-full max-w-[900px] transition-all items-center duration-300 border-vermelho-3 rounded-[5px] border-2 flex flex-wrap gap-5"
              >
                <img
                  src={el.src_image}
                  alt=""
                  className="w-full max-w-[200px] rounded-[10px]"
                />
                <div className="flex flex-col gap-5">
                  <p className="tipo-enfase">{el.nome_empresa}</p>
                  <div className="flex flex-col">
                    {el.descricao ? (
                      <p>
                        <span className="font-bold">Descrição</span>:{" "}
                        {el.descricao}{" "}
                      </p>
                    ) : (
                      <></>
                    )}
                    {el.endereco ? (
                      <p>
                        <span className="font-bold">Endereço</span>:{" "}
                        {el.endereco}{" "}
                      </p>
                    ) : (
                      <></>
                    )}
                    {el.contato ? (
                      <p>
                        <span className="font-bold">Endereço</span>:{" "}
                        {el.contato}{" "}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-[5px]">
              <p>Não encontramos classificados nesta categoria :/</p>
              <a href="/" className="underline">
                Volte para o início
              </a>
            </div>
          )}
          {anunciantes.length != 0 ? (
            <a href="/" className="underline">
              Volte para o início
            </a>
          ) : (
            <></>
          )}
          {subcategorias.length != 0 ? (
            <div>
              <p className="tipo-enfase">Visite também as subcategorias:</p>
              <ul className="flex flex-col gap-[10px] w-full ">
                {subcategorias.map((el) => (
                  <a key={el.id} href="">
                    <li className="px-5 py-2 text-white transition-all duration-300 hover:bg-azul-2-principal hover:border-azul-1-escuro bg-azul-1-escuro border-azul-2-principal rounded-[5px] border-2 flex gap-[10px]">
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
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
