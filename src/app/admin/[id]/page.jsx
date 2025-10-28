import getAnunciantesId from "@actions/get-anunciantes-id";
import Form from "@components/molecules/form";
import { auth } from "@utils/auth";

export default async function AnuncianteId({ params }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const idInt = Number.parseInt(id);

  const dadosAnunciante = await getAnunciantesId(idInt);
  return (
    <>
      <Form dados={dadosAnunciante} />
    </>
  );
}
