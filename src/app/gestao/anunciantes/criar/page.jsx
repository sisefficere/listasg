import getAnunciantesId from "@actions/get-anunciantes-id";
import getTaxonomia from "@actions/get-taxonomia";
import Form from "@components/molecules/form";
import { auth } from "@utils/auth";


export const metadata = {
  title: `Criar anunciante - ${process.env.TITULO}`,
};


export default async function CriarAnunciante({}) {
  const categorias = await getTaxonomia(null, true);

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-[900px]">
      <h3 className="tipo-titulo3">Adicionar novo anunciante</h3>
      <Form adicionar={true} taxonomia={categorias} />
    </div>
  );
}
