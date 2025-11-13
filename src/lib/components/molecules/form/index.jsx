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
      nome_empresa: dados.nome_empresa,
      slug: dados.slug,
      descricao: dados.descricao,
      endereco: dados.endereco,
      end_ref: dados.end_ref,
      telefone: dados.telefone,
      src_image: dados.src_image,
      idCategoria: dados.categoria,
      idSubcategoria: dados.subcategoria,
      categorias: dados.categorias?.nome || "Não definida",
      subcategoria: dados.subcategoria?.nome || "Não definida",
      email: dados.email,
      instagram: dados.instagram,
      facebook: dados.facebook,
      whatsapp: dados.whatsapp,
      website: dados.website,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
    },
  });

  // reatividade
  const nomeEmpresa = useStore(
    form.store,
    (state) => state.values.nome_empresa
  );
  const [imagemUrl, setImagemUrl] = useState(dados.src_image);
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="w-full md:text-end">
        {/* Criado em: {dados.createdAt} | Atualizado em: {dados.updatedAt} */}
      </p>
      {/* bloco para exibir o ID */}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full flex max-w-[900px] flex-col gap-[30px]"
      >
        <fieldset className="flex flex-col gap-[20px]">
          <p className="tipo-subtitulo">Cadastro do anunciante</p>
          <div className="flex flex-col gap-[10px]">
            <div className="w-full flex gap-[10px]">
              <form.Field name="nome_empresa">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-1/2">
                    <Label htmlFor={field.name}>Nome do anunciante</Label>
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
              <form.Field name="slug">
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={field.name}>Slug</Label>
                    <Input
                      disabled
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={
                        field.state.value
                          ? field.state.value
                          : slugify(`${nomeEmpresa}`, {
                              remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
                              lower: true, // convert to lower case, defaults to `false`
                            })
                      }
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>
            <div className="w-full flex gap-[10px]">
              <form.Field name="endereco" className="">
                {(field) => (
                  <div className="flex flex-col gap-2 flex-3/5">
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
                  <div className="flex flex-col gap-2 flex-2/5">
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
            <div className="flex gap-[10px] w-full">
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
                    <Label htmlFor={field.name}>Telefone</Label>
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
            <div className="flex gap-[10px] w-full">
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
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-[10px]">
              <p className="tipo-etiqueta">Taxonomia</p>
              <div className="flex gap-[10px]">
                <div className="flex-1/2 flex gap-[5px]">
                  <form.Field name="idCategoria">
                    {(field) => (
                      <div className="flex flex-col gap-2 flex-1/3">
                        <Label htmlFor={field.name}>ID da categoria</Label>
                        <Input
                          disabled
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                  <form.Field name="categorias">
                    {(field) => (
                      <div className="flex flex-col gap-2 flex-2/3">
                        <Label htmlFor={field.name}>Categoria(s)</Label>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          placeholder="Escolha uma categoria"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>
                <div className="flex-1/2 flex gap-[5px]">
                  <form.Field name="idSubcategoria">
                    {(field) => (
                      <div className="flex flex-col gap-2 flex-1/3">
                        <Label htmlFor={field.name}>ID da Subcategoria</Label>
                        <Input
                          disabled
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                  <form.Field name="subcategoria">
                    {(field) => (
                      <div className="flex flex-col gap-2 flex-2/3">
                        <Label htmlFor={field.name}>Subcategoria(s)</Label>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          placeholder="Escolha uma subcategoria"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="tipo-etiqueta">Detalhes</p>
              <div className="flex gap-[10px]">
                <div>
                  <div className="flex flex-col gap-2 flex-1/3">
                    <img src="" alt="" />
                  </div>
                  <form.Field name="src_image">
                    {(field) => (
                      <div className="flex flex-col items-center justify-center gap-2 flex-1/3">
                        {imageUploaded && (
                          <button
                            className={`text-xl font-black w-full text-end cursor-pointer`}
                            onClick={() => {setImagemUrl(field.state.value); setImageUploaded(false)}}
                          >
                            X
                          </button>
                        )}
                        <img src={imagemUrl} alt="" className="max-w-[200px]" />
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
                                className="cursor-pointer lsg-botao--feature"
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
                <form.Field name="descricao">
                  {(field) => (
                    <div className="flex flex-col gap-2 flex-2/3">
                      <Label htmlFor={field.name}>Descrição do anúncio</Label>
                      <Textarea
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
          </div>
        </fieldset>
      </form>
    </div>
  );
}
