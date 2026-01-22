
import Pesquisa from "@components/molecules/pesquisa";
import { Suspense } from "react";
import ResultadoPesquisa from "@components/molecules/resultado-pesquisa";
import ResultadoPesquisaPlaceholder from "@components/molecules/resultado-pesquisa/--placeholder";
import Categorias from "@components/organisms/categorias/index.jsx";
import getTaxonomiasOffset from "@actions/get-taxonomias-offset";

export const metadata = {
  title: `${process.env.TITULO}`,
  description: "Aqui você encontra o que precisa",
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  // 1.1 Pagina a pesquisa
  const query = params?.query || "";
  const currentPagePesquisa = Number(params?.page) || 1;
  // 1.2 Pagina a categoria
  const catPerPage = 10
  const currentCatPage = Number(params?.catPage) || 1;
  const {taxonomia, totalCategorias} = await getTaxonomiasOffset(currentCatPage, catPerPage);

  return (
    <div className="flex flex-col items-center justify-center gap-6.25">
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
          <Categorias categorias={taxonomia} totalItems={totalCategorias} perPage={catPerPage}/>
        </div>
      </div>
    </div>
  );
}
