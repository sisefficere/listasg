import prisma from "$/src/lib/prisma";

export default async function ResultadoPesquisa({query, currentPage }) {

  let anunciantes
  if(query != ''){
      anunciantes = await prisma.anunciantes.findMany({
        where: {
          OR: [
            {
              nome_empresa: {
                contains: query,
                mode: 'insensitive'
              },
            },
          ],
        },
        select:{
            id: true,
            nome_empresa: true
        }
      });
  }

  return (
    <div className="flex flex-col h-full">
      {anunciantes?.length != 0 ? (
            anunciantes?.map((el) => (
                <div key={el.id}>
                    <a href={`/anunciante/${el.id}`} className="p-5 border-azul-2-principal rounded-[5px] border-2">{el.nome_empresa}</a>
                </div>
            ))
        ) : (
            <></>
        )}
    </div>
  );
}
