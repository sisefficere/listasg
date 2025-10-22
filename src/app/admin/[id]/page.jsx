import { auth } from "@utils/auth";

export default async function AnuncianteId() {
  const session = await auth();
  // se o usuário não estiver logado, não renderiza o componente (retorna null)
  if (!session?.user) {
    redirect("/login");
  }
  return <></>;
}
