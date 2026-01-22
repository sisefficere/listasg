import getAnuncianteIdTudo from "@actions/get-anunciante-id-tudo";
import getAnuncianteNomeId from "@actions/get-anunciante-nome";
import getTaxonomiaIdAnunciantes from "@actions/get-taxonomia-id-anunciantes";
import CardAnunciantes from "@components/molecules/card-anunciantes";
import { BulletItem } from "@components/molecules/bullet-item";
import getAnunciantesPorCategoria from "@actions/get-taxonomia-id-anunciantes-tudo";
import getTaxonomiaIdAnunciantesTudo from "@actions/get-taxonomia-id-anunciantes-tudo";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  const categoria = await getTaxonomiaIdAnunciantes(slug);

  return {
    title: `Anunciantes na categoria "${categoria.nome}" - ${process.env.TITULO}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const categoria = await getTaxonomiaIdAnunciantesTudo(slug);

  return (
    <div className="flex flex-col items-center justify-center gap-12.5 w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">{categoria.nome}</h2>
      </div>
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-2.5 w-full">
        {categoria.anunciantes.map((el) => (
          <CardAnunciantes
            id={el.id}
            nome={el.nome_empresa}
            srcImage={el.src_image}
            descricao={el.descricao}
            endereco={el.endereco}
            endRef={el.end_ref}
            comBorda={true}
            contatos={{
              telefones: el.telefone ? el.telefone.split(",") : [],
              facebook: el.facebook ? el.facebook.split(",") : [],
              instagram: el.instagram ? el.instagram.split(",") : [],
              whatsapp: el.whatsapp ? el.whatsapp.split(",") : [],
              email: el.email ? el.email.split(",") : [],
              website: el.website ? el.website.split(",") : [],
            }}
          />
        ))}
      </ul>
      <a href="/" className="underline">
        Volte para o início
      </a>
    </div>
  );
}
