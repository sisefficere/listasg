import { auth } from "@utils/auth";
import { columns, payments } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";
import getAnunciantes from "@actions/get-anunciantes";

export default async function Admin() {
  const select = {
    id: true,
    nome_empresa: true,
    endereco: true,
    end_ref: true,
    telefone: true,
    updatedAt: true,
  };
  const data = await getAnunciantes(select);
  const session = await auth();
  // se o usuário não estiver logado, não renderiza o componente (retorna null)
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
