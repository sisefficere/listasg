import getTaxonomia from "@actions/get-taxonomia";
import { columns, payments } from "./columns";
import { DataTable } from "./data-table";
import getAnunciantes from "@actions/get-anunciantes";

export default async function Taxonomia() {
  const select = {
    id: true,
    nome: true,
    parentId: true,
    descricao: true,
    parent:{
      select:{
        nome: true
      }
    },
    children: {
      select:{
        nome:true
      }
    },
    updatedAt: true,
  };
  const data = await getTaxonomia(select);

  return (
    <div className="container w-full max-w-[900px] flex flex-col items-center gap-5">
      <h2 className="tipo-titulo2">Gestão de categorias</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
