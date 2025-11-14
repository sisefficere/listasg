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
/*
DADOS NECESSÁRIOS:

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
{
      id: "728ed52f",
      nomeEmpresa: '100',
descricao: "m@example.com",
      endereco: "m@example.com",
      endRef: "m@example.com",
      telefone: "m@example.com",
      updatedAt: ""
      // slug: "pending",
      // srcImage: "m@example.com",
      // categoria: "m@example.com",
      // subcategoria: "m@example.com",
      // email: "m@example.com",
      // instagram: "m@example.com",
      // facebook: "m@example.com",
      // whatsapp: "m@example.com",
      // website: "m@example.com",
      // createdAt: "",
    },

 {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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

*/

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
