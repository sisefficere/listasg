import getAnunciantesId from "@actions/get-anunciantes-id";
import getTaxonomia from "@actions/get-taxonomia";
import FormTaxonomia from "@components/molecules/form/--taxonomia";
import { auth } from "@utils/auth";

export const metadata = {
  title: `Criar categoria - ${process.env.TITULO}`,
};

export default async function CriarCategoria({}) {
  const categorias = await getTaxonomia(null, true);

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-[900px]">
      <h3 className="tipo-titulo3">Adicionar nova categoria</h3>
      <FormTaxonomia adicionar={true} taxonomia={categorias} />
    </div>
  );
}
