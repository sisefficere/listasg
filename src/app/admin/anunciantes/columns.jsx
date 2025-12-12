"use client";

import {
  MoreHorizontal,
  ArrowUpDown,
  SquarePen,
  Trash,
  Pin,
} from "lucide-react";
import { Checkbox } from "@components/ui/checkbox";
import { Button } from "@components/ui/button";
import Link from "next/link";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nome_empresa",
    header: "Nome",
  },
  {
    accessorKey: "taxonomias",
    header: "Categoria",
    cell: (row)=>{
      return row.getValue("taxonomias")?.nome
    }
  },
  {
    accessorKey: "telefone",
    header: "Telefone(s)",
  },
  {
    accessorKey: "endereco",
    header: "Endereço",
    cell: (row) => {
      const endereco = row.getValue("endereco");
      const endReferencia = row.getValue("end_ref") && row.getValue("end_ref");

      let endComReferencia = "Não cadastrado";

      if (endereco) {
        if (endReferencia) {
          endComReferencia = endereco + ", " + endReferencia;
        } else {
          return endereco;
        }
      }

      return endComReferencia;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
  },
  {
    id: "acoes",
    header: ({ column }) => {
      function togglePin(column, direcao) {
        console.log(column.getIsPinned());
        if (column.getIsPinned()) {
          column.pin(false);
        } else {
          column.pin(direcao);
        }
      }
      return (
        <div className="flex gap-2 py-1 justify-center items-center">
          Ações
          <Button
            size="icon"
            variant="outline"
            onClick={() => togglePin(column, "right")}
          >
            <Pin />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const idAnunciante = row.getValue("id");
      return (
        <div className="flex gap-2 px-5 justify-center items-center">
          <Link href={`/admin/anunciantes/${idAnunciante}`}>
            <Button size="sm" variant="secondary" className="cursor-pointer">
              <SquarePen /> Editar
            </Button>
          </Link>
          {/* <Button size="sm" variant="destructive">
            <Trash /> Excluir
          </Button> */}
        </div>
      );
    },
  },
];
