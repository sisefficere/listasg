import { auth } from "@utils/auth";
import { redirect } from "next/navigation";


export default async function AdminLayout({ children }) {
  const session = await auth();
  // se o usuário não estiver logado, não renderiza o componente (retorna null)
  if (!session?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
