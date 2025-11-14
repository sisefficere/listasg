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
import upsertAnunciantes from "@actions/upsert-anunciantes";
import upsertTaxonomia from "@actions/upsert-taxonomia";

export default function Form({ dados }) {
  /*
        TO-DO
        - Criar uma nova tabela com autorrelação chamada taxonomia
        - Action para pegar todas as subcategorias e categorias (somente nome e ID)
        - Field com dropdown para escolher o ID da categoria e subcategoria escolhida
        - 
    */
  const form = useForm({
    defaultValues: {
      id: dados.id,
      nome: dados.nome,
      slug: dados.slug,
      descricao: dados.descricao,
      parent: dados.parent,
      children: dados.children,
      anunciantes: dados.anunciantes,
    },
    onSubmit: async ({ value }) => {
      upsertTaxonomia(value.id, value);

      alert("Cadastro salvo com sucesso");
    },
  });

  // reatividade
  const nomeTaxonomia = useStore(form.store, (state) => state.values.nome);

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[900px]">
      {/* bloco para exibir o ID */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="w-full flex flex-col gap-[30px]"
      >
        <fieldset className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <div className="w-full flex flex-wrap gap-[10px]">
              <form.Field name="nome">
                {(field) => (
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor={field.name}>Nome da categoria</Label>
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
              <form.Field name="slug">
                {(field) => (
                  <Input
                    type="hidden"
                    id={field.name}
                    name={field.name}
                    value={
                      field.state.value
                        ? field.state.value
                        : slugify(`${nomeTaxonomia}`, {
                            remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
                            lower: true, // convert to lower case, defaults to `false`
                          })
                    }
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
              <form.Field name="descricao">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-5/6 max-sm:order-1">
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
              <form.Field name="parent">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-1/5">
                    <Label htmlFor={field.name}>Categoria Pai</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="children">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-1/5">
                    <Label htmlFor={field.name}>Subcategoria(s)</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </fieldset>
        <div className="w-full flex gap-5 justify-end items-center">
          <button
            type="submit"
            className="lsg-botao-action--negativa-small"
            onClick={() => form.reset()}
          >
            Redefinir
          </button>
          <button
            type="submit"
            className="lsg-botao--login"
            onClick={() => form.handleSubmit({ submitAction: "continue" })}
          >
            Salvar
          </button>
        </div>
        <p className="w-full tipo-irrelevante flex flex-col gap-1 text-end">
          <span>{"Criado em: " + dados.createdAt}</span>
          <span>{"Atualizado em: " + dados.updatedAt}</span>
        </p>
      </form>
    </div>
  );
}
