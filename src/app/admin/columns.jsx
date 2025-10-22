"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@components/ui/checkbox"


import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@components/ui/dropdown-menu";

// DADOS NECESSÁRIOS:
// {
//       id: "728ed52f",
//       nomeEmpresa: '100',
// descricao: "m@example.com",
//       endereco: "m@example.com",
//       endRef: "m@example.com",
//       telefone: "m@example.com",
//       updatedAt: ""
//       // slug: "pending",
//       // srcImage: "m@example.com",
//       // categoria: "m@example.com",
//       // subcategoria: "m@example.com",
//       // email: "m@example.com",
//       // instagram: "m@example.com",
//       // facebook: "m@example.com",
//       // whatsapp: "m@example.com",
//       // website: "m@example.com",
//       // createdAt: "",
//     },


/*
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
      )
    },
  },
 {
    accessorKey: "nome_empresa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'text'
  },
  {
    accessorKey: "endereco",
    header: "Endereço",
    cell: (row) => {
      const endereco = row.getValue("endereco")
      const endReferencia = row.getValue("end_ref") && row.getValue("end_ref")

      let endComReferencia = "Não cadastrado"

      if(endereco){
        if(endReferencia){
          endComReferencia =  endereco + ', ' + endReferencia
        }else{
          return endereco
        }
      }

      return endComReferencia
    },
  },
   {
    accessorKey: "telefone",
    header: "Telefone(s)",
  },
   {
    accessorKey: "updatedAt",
    header: "Atualizado em",
  },
];
