import getAnuncianteIdTudo from "@actions/get-anunciante-id-tudo";
import getAnuncianteNomeId from "@actions/get-anunciante-nome";
import getTaxonomiaIdAnunciantes from "@actions/get-taxonomia-id-anunciantes";
import CardAnunciantes from "@components/molecules/card-anunciantes";
import { BulletItem } from "@components/molecules/bullet-item";

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
  const categoria = await getTaxonomiaIdAnunciantes(slug);

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">{categoria.nome}</h2>
      </div>
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-2.5 w-full">
        {categoria.anunciantes.map((el) => (
          <BulletItem key={el.id} href={`/anunciante/${el.id}`} nome={el.nome_empresa} />
        ))}
      </ul>
      <a href="/" className="underline">
        Volte para o início
      </a>
    </div>
  );
}
