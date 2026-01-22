import Categorias from "@components/organisms/categorias";
import { redirect } from "next/navigation";
import getTaxonomiasOffset from "@actions/get-taxonomias-offset";

export default async function CategoriasPage({ searchParams }) {
  const params = await searchParams;
  const catPerPage = 10;
  const currentCatPage = Number(params?.catPage) || 1;
  const { taxonomia, totalCategorias } = await getTaxonomiasOffset(
    currentCatPage,
    catPerPage,
  );
  return (
    <div className="flex flex-col items-center justify-center gap-6.25">
        <h2 className="tipo-titulo2">Categorias</h2>
        <Categorias
          categorias={taxonomia}
          totalItems={totalCategorias}
          perPage={catPerPage}
          pagina="/categorias"
        />
    </div>
  );
}
