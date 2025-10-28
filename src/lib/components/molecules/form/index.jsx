"use client";

import { formOptions, useForm } from "@tanstack/react-form";

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

  //   console.log(dados);

  /*   field é uma API, passada dentro de um campo

    const { isTouched, isDirty, isPristine, isBlurred } = field.state.meta
    https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts
*/

  return (
    <div className="flex flex-col gap-5">
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
      >
        <form.Field
          name="nome_empresa"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="slug"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="descricao"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="endereco"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="end_ref"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="telefone"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="src_image"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="idCategoria"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="idSubcategoria"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="categorias"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="subcategoria"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="instagram"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="facebook"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="whatsapp"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="website"
          children={(field) => (
            <>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
      </form>
    </div>
  );
}
