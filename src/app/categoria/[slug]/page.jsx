import CardAnunciantes from "@components/molecules/card-anunciantes";
import Subcategorias from "@components/organisms/subcategorias";
import getSubcategorias from "@actions/get-subcategorias";
import prisma from "@utils/prisma";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
  const slugInt = parseInt(slug);

  const categoria = await prisma.categorias.findUnique({
    where: { id: slugInt },
    select: {
      nome: true,
    },
  });

  return {
    title: `${categoria.nome} - ${process.env.TITULO}`,
  };
}

export default async function Page({ params, searchParams }) {
  const paramsQuery = await searchParams;
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const categoria = await prisma.categorias.findUnique({
    where: { id: slugInt },
  });
  const subcategorias = await getSubcategorias(slugInt, Number(paramsQuery?.cursor), Boolean(paramsQuery?.voltar))

  const anunciantes = await prisma.anunciantes.findMany({
    where: { categoria: slugInt },
  });

  anunciantes.forEach((el) => {
    const telefones = el.telefone ? el.telefone.split(",") : [];
    const usuariosFacebook = el.facebook ? el.facebook.split(",") : [];
    const usuariosWpp = el.whatsapp ? el.whatsapp.split(",") : [];
    const usuariosInstagram = el.instagram ? el.instagram.split(",") : [];
    const emails = el.email ? el.email.split(",") : [];
    const websites = el.website ? el.website.split(",") : [];

    el.telefone = telefones;
    el.facebook = usuariosFacebook;
    el.whatsapp = usuariosWpp;
    el.instagram = usuariosInstagram;
    el.email = emails;
    el.website = websites;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">Classificados em "{categoria.nome}"</h2>
      </div>
      <div className="flex flex-col items-center gap-5 w-full ">
        {anunciantes.length != 0 ? (
          anunciantes.map((el) => (
            <CardAnunciantes
              key={el.id}
              id={el.id}
              srcImage={el.src_image}
              nome={el.nome_empresa}
              descricao={el.descricao}
              endereco={el.endereco}
              endRef={el.end_ref}
              contatos={{
                telefones: el.telefone,
                facebook: el.facebook,
                whatsapp: el.whatsapp,
                email: el.email,
                instagram: el.instagram,
                website: el.website
              }}
            />
          ))
        ) : (
          <></>
        )}
        {subcategorias.length != 0 ? (
            <Subcategorias subcategorias={subcategorias} />
        ) : (
          <></>
        )}
        {subcategorias.length == 0 && anunciantes.length == 0 ? (
          <div className="flex flex-col items-center gap-[5px]">
            <p>Não encontramos classificados nesta categoria :/</p>
          </div>
        ) : (
          <></>
        )}
      </div>
        <a href="/" className="underline">
          Volte para o início
        </a>
    </div>
  );
}
