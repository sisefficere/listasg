import getAnunciantesId from "@actions/get-anunciantes-id";
import getTaxonomia from "@actions/get-taxonomia";
import Form from "@components/molecules/form";
import { auth } from "@utils/auth";

export default async function AnuncianteId({ params }) {
  const { id } = await params;

  const idInt = Number.parseInt(id);

  const dadosAnunciante = await getAnunciantesId(idInt);
    const categorias = await getTaxonomia(null, true)

  return (
    <div className="flex flex-col gap-5 items-center max-w-[900px]">
      <h3 className="tipo-titulo3">Edição de cadastro</h3>
      <Form dados={dadosAnunciante} taxonomia={categorias} />
    </div>
  );
}
