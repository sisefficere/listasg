import getAnuncianteIdTudo from "@actions/get-anunciante-id-tudo";
import getAnuncianteNomeId from "@actions/get-anunciante-nome";
import CardAnunciantes from "@components/molecules/card-anunciantes";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  const anunciante = await getAnuncianteNomeId(slug);

  return {
    title: `${anunciante.nome_empresa} - ${process.env.TITULO}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const anunciante = await getAnuncianteIdTudo(slug)

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">{anunciante.nome_empresa}</h2>
      </div>
      <div className="flex flex-col items-center gap-5 w-full ">
        <CardAnunciantes
          srcImage={anunciante.src_image}
          descricao={anunciante.descricao}
          endereco={anunciante.endereco}
          endRef={anunciante.end_ref}
          comBorda={false}
          contatos={{
            telefones: anunciante.telefone ? anunciante.telefone.split(",") : [],
              facebook: anunciante.facebook ? anunciante.facebook.split(",") : [],
              instagram: anunciante.instagram ? anunciante.instagram.split(",") : [],
              whatsapp: anunciante.whatsapp ? anunciante.whatsapp.split(",") : [],
              email: anunciante.email ? anunciante.email.split(",") : [],
              website: anunciante.website ? anunciante.website.split(",") : [],
          }}
        />
      </div>
      <a href="/" className="underline">
        Volte para o início
      </a>
    </div>
  );
}
