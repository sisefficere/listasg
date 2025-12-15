import Link from "next/link";
import { columns, payments } from "./columns";
import { DataTable } from "./data-table";
import getAnunciantes from "@actions/get-anunciantes";

export default async function Anunciantes() {
  const select = {
    id: true,
    nome_empresa: true,
    endereco: true,
    end_ref: true,
    telefone: true,
    updatedAt: true,
    taxonomias: {
      select: {
        nome: true,
      },
    },
    slug: true,
  };
  const data = await getAnunciantes(select);

  return (
    <div className="container w-full max-w-[900px] flex flex-col items-center gap-5">
      <h2 className="tipo-titulo2">Gestão de anunciantes</h2>
      <div className="flex flex-col gap-2 items-center">
        <Link
          href="/admin/anunciantes/criar"
          className="lsg-botao--login self-end"
        >
          Adicionar novo
        </Link>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
