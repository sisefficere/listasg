"use client";

import { div, legend, fieldset } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { formOptions, useForm } from "@tanstack/react-form";
import slugify from "slugify";
import { FieldApi } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-form";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Button } from "@components/ui/button";
import { Check, ChevronsUpDown, ArrowUpRight } from "lucide-react";
import { cn } from "@public/lib/utils";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import upsertAnunciantes from "@actions/upsert-anunciantes";
import upsertTaxonomia from "@actions/upsert-taxonomia";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import Link from "next/link";

export default function Form({ dados, taxonomia, adicionar = false }) {
  let form;
  const [formChanged, setFormChanged] = useState(false);

  /*
    Dois cenários:
    - Edição
    - Novo item

    EDIÇÃO
    O state valueCategoriaPai deve iniciar com os dados padrão
    Existem valores padrão, ou seja, o comportamento das combobox (para exibir botão de redefinir e de salvar) devem considerar o valor padrão, se diferente do padrão, exibe os botões.

    NOVO ITEM
    Não existem valores padrão, ou seja, o comportamento das combobox (para exibir botão de redefinir e de salvar) devem considerar o valor vazio ou não, ou seja, false ou true.
  */

  if (adicionar) {
    form = useForm({
      defaultValues: {
        nome: "",
        slug: "",
        descricao: "",
        parentId: "",
      },
      onSubmit: async ({ value }) => {
        upsertTaxonomia(null, value);

        alert("Categoria salva com sucesso");

        redirect("/admin/taxonomia");
      },
      listeners: {
        onChange: ({ formApi }) => {
          setFormChanged(!formApi.state.isDefaultValue);
        },
      },
    });
  } else {
    form = useForm({
      defaultValues: {
        id: dados.id,
        nome: dados.nome,
        slug: dados.slug,
        descricao: dados.descricao,
        parentId: dados.parentId,
      },
      onSubmit: async ({ value }) => {
        upsertTaxonomia(value.id, value);
        alert("Categoria salva com sucesso");
        redirect("/admin/taxonomia");
      },
      listeners: {
        onChange: ({ formApi }) => {
          setFormChanged(!formApi.state.isDefaultValue);
        },
      },
    });
  }

  // É necessário um state para cada campo fora do padrão, nesse caso é um comboBox
  const [valueCategoriaPai, setValueCategoriaPai] = useState(dados?.parentId);

  // necessário para definir o valor do campo parentId dado que comboBox não é um campo padrão do form
  if (valueCategoriaPai != dados?.parentId) {
    // é necessário tornar o resultado em null se for vazio, pois se passar pelo parseInt o retorno é NaN e este não é aceito no BD (logo, não salva as alterações)
    form.state.values.parentId =
      valueCategoriaPai === ""
        ? valueCategoriaPai
        : Number.parseInt(valueCategoriaPai);
  }

  const nomeTaxonomia = useStore(form.store, (state) => state.values.nome);
  const [open, setOpen] = useState(false);

  // valida se ocorreu modificação nos campos que não mudam o onChange (imagem e categoria)
  let mudouAlgo;
  if (adicionar) {
    mudouAlgo = formChanged || valueCategoriaPai;
  } else {
    mudouAlgo = formChanged || valueCategoriaPai != dados.parentId;
  }

  form.state.values.slug = slugify(`${nomeTaxonomia}`, {
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-225">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="w-full flex flex-col gap-7.5"
      >
        <fieldset className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-wrap gap-2.5">
              <div className="flex gap-2.5 max-sm:flex-wrap w-full">
                <div className="flex flex-col w-full gap-2 flex-1/5">
                  <Label>Categoria Pai</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between cursor-pointer"
                      >
                        {valueCategoriaPai
                          ? taxonomia.find(
                              (item) => item.id === valueCategoriaPai
                            )?.nome
                          : "Não definida"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-50 p-0">
                      <Command>
                        <CommandInput placeholder="Filtre..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>
                            Nenhuma categoria encontrada.
                          </CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              key="01"
                              value=""
                              onSelect={() => {
                                setValueCategoriaPai("");
                                setOpen(false);
                              }}
                            >
                              Não definida
                              <Check
                                className={cn(
                                  "ml-auto",
                                  valueCategoriaPai === ""
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                            {taxonomia.map((item) => {
                              return (
                                <CommandItem
                                  key={item.id}
                                  value={item.id}
                                  onSelect={() => {
                                    setValueCategoriaPai(item.id);
                                    setOpen(false);
                                  }}
                                >
                                  {item.nome}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      valueCategoriaPai === item.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <form.Field name="nome">
                  {(field) => (
                    <div className="flex flex-col gap-2 w-full flex-4/5">
                      <Label htmlFor={field.name}>
                        <p>
                          Nome da categoria
                          <span className="font-bold text-vermelho-2-principal">
                            *
                          </span>
                        </p>
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder="Digite o nome da categoria."
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>
              </div>
              <form.Field name="descricao">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-5/6">
                    <Label htmlFor={field.name}>Descrição da categoria</Label>
                    <Textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Descreva a categoria."
                    />
                  </div>
                )}
              </form.Field>
              <div className="flex flex-col gap-1.5 w-full">
                {dados?.children && dados.children.length > 0 && (
                  <>
                    <Label>Lista de subcategorias:</Label>
                    <ul className="flex items-center flex-wrap gap-1">
                      {dados.children.map((el) => {
                        return (
                          <li>
                            <Button variant="outline" asChild size="sm">
                              <Link
                                key={el.id}
                                href={`/admin/taxonomia/${el.id}`}
                              >
                                {el.nome}
                                <ArrowUpRight />
                              </Link>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </fieldset>
        <div className="w-full flex gap-5 justify-end items-center">
          {/* É necessário validar também os campos fora do padrão como os combobox (por meio dos seus state), a alteração deles não altera o state onChange do form */}
          {mudouAlgo && (
            <button
              type="submit"
              className="lsg-botao-action--negativa-small"
              onClick={() => {
                form.reset();
                setFormChanged(false);
                setValueCategoriaPai(adicionar ? "" : dados.parentId);
              }}
            >
              Redefinir
            </button>
          )}
          <button
            type="submit"
            className={`${
              mudouAlgo ? "lsg-botao--login" : "lsg-botao--desativado-verde"
            } `}
            onClick={() =>
              mudouAlgo && form.handleSubmit({ submitAction: "continue" })
            }
          >
            {adicionar ? "Adicionar" : "Salvar"}
          </button>
        </div>
        <p className="w-full tipo-irrelevante flex flex-col gap-1 text-end">
          <span>{dados?.createdAt && "Criado em: " + dados.createdAt}</span>
          <span>{dados?.updatedAt && "Atualizado em: " + dados.updatedAt}</span>
        </p>
      </form>
    </div>
  );
}
