import getAnunciantesId from "@actions/get-anunciantes-id";
import getTaxonomia from "@actions/get-taxonomia";
import getTaxonomiaId from "@actions/get-taxonomia-id";
import FormTaxonomia from "@components/molecules/form/--taxonomia";
import { auth } from "@utils/auth";

export default async function TaxonomiaId({ params }) {

  const { id } = await params;

  const idInt = Number.parseInt(id);

  const dadosTaxonomia = await getTaxonomiaId(idInt);
    const categorias = await getTaxonomia(null, true)

  return (
    <div className="flex flex-col w-full gap-5 items-center max-w-[900px]">
      <h3 className="tipo-titulo3">Edição de categoria</h3>
      <FormTaxonomia dados={dadosTaxonomia} taxonomia={categorias}/>
    </div>
  );
}
