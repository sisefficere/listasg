import prisma from "$/src/lib/prisma";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default async function ResultadoPesquisa({ query, currentPage }) {
  let anunciantes;
  if (query != "") {
    anunciantes = await prisma.anunciantes.findMany({
      where: {
        OR: [
          {
            nome_empresa: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            descricao: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        nome_empresa: true,
        endereco: true,
      },
    });
  }

  return (
    <>
      {query != "" && anunciantes?.length != 0 ? (
        <div className="flex flex-col gap-5 h-full p-5 border-azul-2-principal rounded-[5px] border-2">
          {anunciantes?.map((el) => (
            <div className="flex flex-wrap items-center gap-[10px]">
              <p className="">
                <span className="font-bold">{el.nome_empresa}</span> {el.endereco ? `- ${el.endereco}` : ""}
              </p>
              <a
                href={`/anunciante/${el.id}`}
                key={el.id}
                className="bg-vermelho-2-principal text-branco-4-claro-principal px-5 p-2 rounded-lg"
              >
                Ver mais
              </a>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
