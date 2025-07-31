
import Pesquisa from "$/src/lib/components/molecules/pesquisa/pesquisa";
import { Suspense } from "react";
import ResultadoPesquisa from "$/src/lib/components/molecules/resultado-pesquisa/resultado-pesquisa";
import ResultadoPesquisaPlaceholder from "$/src/lib/components/molecules/resultado-pesquisa/--placeholder/resultado-pesquisa--placeholder";
import Categorias from "$/src/lib/components/organisms/categorias/categorias.jsx";
import getCategorias from "$/src/lib/db/get-categorias";
import { CursorContext } from "$/src/lib/components/contexts";
import { useContext } from "react";

export const metadata = {
  title: "ListaSG Classificados",
  description: "Aqui você encontra o que precisa",
};

export default async function Home({ searchParams }) {
  const pesquisa = await searchParams;
  const query = pesquisa?.query || "";
  const currentPage = Number(pesquisa?.page) || 1;
  const cursor = useContext(CursorContext);
  const categorias = await getCategorias(cursor);

  return (
    <div className="flex flex-col items-center justify-center gap-[25px] estrutura-padding">
      <div className="flex flex-col w-full items-center">
        <h1 className="tipo-titulo1">Bem vindo(a)!</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 justify-center h-full w-full">
          <Pesquisa />
          <Suspense
            key={query + currentPage}
            fallback={
              <>
                <ResultadoPesquisaPlaceholder />
              </>
            }
          >
            <ResultadoPesquisa query={query} currentPage={currentPage} />
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
