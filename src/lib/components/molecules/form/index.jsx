"use client";

import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import slugify from "slugify";
import { useStore } from "@tanstack/react-form";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import ImageHandle from "../image-handle";
import upsertAnunciantes from "@actions/upsert-anunciantes";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Switch } from "@components/ui/switch";

import { redirect } from "next/navigation";

import { cn } from "@public/lib/utils";
import { Button } from "@components/ui/button";
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

export default function Form({ dados, taxonomia, adicionar = false }) {
  let form;

  const [formChanged, setFormChanged] = useState(false);

  if (adicionar) {
    form = useForm({
      defaultValues: {
        nome_empresa: "",
        slug: "",
        descricao: "",
        endereco: "",
        end_ref: "",
        telefone: "",
        src_image: "",
        taxonomia: "",
        email: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        website: "",
        ativo: true,
      },
      onSubmit: async ({ value }) => {
        value.ativo = estadoAnuncio
        upsertAnunciantes(null, value);
        alert("Novo anunciante criado!");
        redirect("/gestao/anunciantes");
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
        nome_empresa: dados.nome_empresa,
        slug: dados.slug,
        descricao: dados.descricao,
        endereco: dados.endereco,
        end_ref: dados.end_ref,
        telefone: dados.telefone,
        src_image: dados.src_image,
        taxonomia: dados.taxonomia,
        email: dados.email,
        instagram: dados.instagram,
        facebook: dados.facebook,
        whatsapp: dados.whatsapp,
        website: dados.website,
        ativo: dados.ativo === "" || dados.ativo === null ? false : dados.ativo,
      },
      onSubmit: async ({ value }) => {
        value.ativo = estadoAnuncio   // necessário para definir o valor do campo dado que o mesmo não é um campo padrão do form, não recebe um input
        upsertAnunciantes(value.id, value);
        alert("Cadastro salvo com sucesso");
        redirect("/gestao/anunciantes");
      },
      listeners: {
        onChange: ({ formApi }) => {
          setFormChanged(!formApi.state.isDefaultValue);
        },
      },
    });
  }

  // reatividade
  const nomeEmpresa = useStore(
    form.store,
    (state) => state.values.nome_empresa
  );

  const [open, setOpen] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  // necessário para inserir o srcImage (não é campo padrão é o widget do cloudinary)
  const [imagemUrl, setImagemUrl] = useState(dados?.src_image);
  if (imagemUrl != dados?.src_image) {
    form.state.values.src_image =
      imagemUrl === "" ? dados?.src_image : imagemUrl;
  }
  // necessário para definir o valor do campo status dado que switch não é um campo padrão do form
  const [estadoAnuncio, setEstadoAnuncio] = useState(dados.ativo);
  if (estadoAnuncio != dados.ativo) {
    form.state.values.ativo = estadoAnuncio;
  }

  // necessário para definir o valor do campo parentId dado que comboBox não é um campo padrão do form
  const [valueTaxonomia, setValueTaxonomia] = useState(dados?.taxonomia);
  if (valueTaxonomia != dados?.taxonomia) {
    form.state.values.taxonomia =
      valueTaxonomia === "" ? valueTaxonomia : Number.parseInt(valueTaxonomia);
  }

  // valida se ocorreu modificação nos campos que não mudam o onChange (imagem, categoria e status)
  let mudouAlgo;
  if (adicionar) {
    mudouAlgo = formChanged || valueTaxonomia || imagemUrl || estadoAnuncio;
  } else {
    mudouAlgo =
      formChanged ||
      valueTaxonomia != dados.taxonomia ||
      imagemUrl != dados.src_image ||
      estadoAnuncio != dados.ativo;
  }

  form.state.values.slug = slugify(`${nomeEmpresa}`, {
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
        className="w-full flex flex-col gap-[30px]"
      >
        <fieldset className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <form.Field name="ativo"
              children={(field) => (
                <div className="flex flex-col gap-2 w-full items-end justify-center">
                  <div className="flex gap-2">
                    <Label htmlFor={field.name}>Ativo?</Label>
                    <Switch
                      id={field.name}
                      className="cursor-pointer"
                      checked={estadoAnuncio}
                      onCheckedChange={() => {
                        estadoAnuncio
                          ? setEstadoAnuncio(false)
                          : setEstadoAnuncio(true);
                      }}
                    />
                  </div>
                  <p className="tipo-irrelevante text-end">
                    Clique para alterar
                    <br />
                    (verde = ativo; vermelho = inativo)
                  </p>
                </div>
              )}
            />
            <form.Field name="nome_empresa">
              {(field) => (
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor={field.name}>
                    <p>
                      Nome do anunciante
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
                    placeholder="Digite o nome do anunciante."
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
            <div className="w-full flex gap-[10px] max-sm:flex-col">
              <form.Field name="endereco" className="">
                {(field) => (
                  <div className="flex flex-col gap-2 max-sm:w-full sm:flex-3/5">
                    <Label htmlFor={field.name}>Endereço</Label>
                    <Input
                      value={field.state.value}
                      placeholder="Ex.: Rua Francisco da Silva, 2990, Santa Marta"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="end_ref">
                {(field) => (
                  <div className="flex flex-col gap-2 max-sm:w-full sm:flex-2/5">
                    <Label htmlFor={field.name}>Referência</Label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Ex.: Ao lado hotel San Isidro"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="tipo-etiqueta">Canais de contato</p>
            <div className="flex gap-[10px] w-full max-sm:flex-col">
              <form.Field name="whatsapp">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-6/12">
                    <Label htmlFor={field.name}>Whatsapp</Label>
                    <Input
                      value={field.state.value}
                      placeholder="Ex.: 55 99980-3255, 51 98560-1192"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="telefone">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-3/12">
                    <Label htmlFor={field.name}>
                      <p>
                        Telefone
                        <span className="font-bold text-vermelho-2-principal">
                          *
                        </span>
                      </p>
                    </Label>
                    <Input
                      value={field.state.value}
                      placeholder="Ex.: 55 3232-2019"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-3/12">
                    <Label htmlFor={field.name}>E-mail</Label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Ex.: contato@empresa.com.br"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>
            <div className="flex gap-[10px] w-full max-sm:flex-col">
              <form.Field name="instagram">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-1/3">
                    <Label htmlFor={field.name}>Instagram</Label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Ex.: usuario528"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="facebook">
                {(field) => (
                  <div className="flex flex-col gap-2  flex-1/3">
                    <Label htmlFor={field.name}>Facebook</Label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Ex.: usuario895"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="website">
                {(field) => (
                  <div className="flex flex-col gap-2  flex-1/3">
                    <Label htmlFor={field.name}>Website</Label>
                    <Input
                      value={field.state.value}
                      placeholder="Ex.: empresa.com.br"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-[20px]">
          <p className="tipo-subtitulo">Cadastro do anúncio</p>
          <div className="flex max-sm:flex-col gap-[15px] w-full">
            <div className="max-sm:w-full sm:flex-1/6 flex flex-col gap-[10px]">
              <div className="flex flex-col gap-2">
                <Label>Categoria</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="max-sm:w-full sm:w-[200px] justify-between cursor-pointer"
                    >
                      <span className="w-[90%] overflow-clip">
                        {valueTaxonomia
                          ? taxonomia.find((item) => item.id === valueTaxonomia)
                              ?.nome
                          : "Selecione uma categoria..."}
                      </span>
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Filtre..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>
                          Nenhuma categoria encontrada.
                        </CommandEmpty>
                        <CommandGroup>
                          {taxonomia.map((item) => {
                            return (
                              <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={() => {
                                  setValueTaxonomia(item.id);
                                  setOpen(false);
                                }}
                                className="wrap-break-word"
                              >
                                {item.nome}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    valueTaxonomia === item.id
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
              <form.Field name="src_image">
                {(field) => (
                  <div className="flex flex-col items-center justify-center max-sm:order-2 gap-2">
                    {imageUploaded && (
                      <button
                        className={`text-xl font-black w-full text-end cursor-pointer`}
                        onClick={() => {
                          setImagemUrl(dados?.src_image);
                          setImageUploaded(false);
                        }}
                      >
                        X
                      </button>
                    )}
                    <ImageHandle
                      srcImage={imagemUrl}
                      id={field.form.getFieldValue("id") + "-" + field.name}
                      imgWidthClass="w-full max-w-[150px]"
                      boxShadow="shadow-md"
                    />
                    <Input
                      type="hidden"
                      value={imagemUrl}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <CldUploadWidget
                      uploadPreset="pasta-anunciantes"
                      onSuccess={(results) => {
                        setImagemUrl(results?.info.url);
                        setImageUploaded(true);
                      }}
                    >
                      {({ open }) => {
                        return (
                          <button
                            onClick={() => open()}
                            className="lsg-botao-action--small"
                          >
                            Escolha uma imagem
                          </button>
                        );
                      }}
                    </CldUploadWidget>
                  </div>
                )}
              </form.Field>
            </div>
            <div className="flex flex-5/6">
              <form.Field name="descricao">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-5/6 max-sm:order-1">
                    <Label htmlFor={field.name}>Descrição do anúncio</Label>
                    <Textarea
                      className="h-[200px]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Descreva o anúncio."
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </fieldset>
        <div className="w-full flex gap-5 justify-end items-center">
          {mudouAlgo && (
            <button
              type="submit"
              className="lsg-botao-action--negativa-small"
              onClick={() => {
                form.reset();
                setFormChanged(false);
                setValueTaxonomia(adicionar ? undefined : dados.taxonomia);
                setImagemUrl(adicionar ? undefined : dados.src_image);
                setImageUploaded(false);
                setEstadoAnuncio(adicionar ? undefined : dados.ativo);
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
