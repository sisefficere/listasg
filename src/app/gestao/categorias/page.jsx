import getTaxonomia from "@actions/get-taxonomia";
import { columns, payments } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";

export const metadata = {
  title: `Gestão de categorias - ${process.env.TITULO}`,
};


export default async function Taxonomia() {
  const select = {
    id: true,
    nome: true,
    parentId: true,
    descricao: true,
    parent: {
      select: {
        nome: true,
      },
    },
    children: {
      select: {
        nome: true,
      },
    },
    updatedAt: true,
  };
  const data = await getTaxonomia(select);

  return (
    <div className="container w-full max-w-225 flex flex-col items-center gap-5">
      <h2 className="tipo-titulo2">Gestão de categorias</h2>
      <div className="flex flex-col gap-2 items-center">
        <Link
          href="/gestao/categorias/criar"
          className="lsg-botao--login self-end"
        >
          Adicionar nova
        </Link>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
