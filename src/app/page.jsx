
import Pesquisa from "$/src/lib/components/molecules/pesquisa/pesquisa";
import { Suspense } from "react";
import ResultadoPesquisa from "$/src/lib/components/molecules/resultado-pesquisa/resultado-pesquisa";
import ResultadoPesquisaPlaceholder from "$/src/lib/components/molecules/resultado-pesquisa/--placeholder/resultado-pesquisa--placeholder";
import Categorias from "$/src/lib/components/organisms/categorias/categorias.jsx";
import getCategorias from "$/src/lib/core/db/get-categorias";

export const metadata = {
  title: "ListaSG Classificados",
  description: "Aqui você encontra o que precisa",
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const categorias = await getCategorias(Number(params?.cursor), Boolean(params?.voltar));
  const query = params?.query || "";
  const currentPagePesquisa = Number(params?.page) || 1;

  return (
    <div className="flex flex-col items-center justify-center gap-[25px] estrutura-padding">
      <div className="flex flex-col w-full items-center">
        <h1 className="tipo-titulo1">Bem vindo(a)!</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 justify-center h-full w-full">
          <Pesquisa />
          <Suspense
            key={query + currentPagePesquisa}
            fallback={
              <>
                <ResultadoPesquisaPlaceholder />
              </>
            }
          >
            <ResultadoPesquisa query={query} currentPage={currentPagePesquisa} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-2">
          <p className="tipo-enfase">Ou escolha uma categoria:</p>
          <Categorias categorias={categorias} />
        </div>
      </div>
    </div>
  );
}
