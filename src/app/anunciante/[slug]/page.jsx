import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import { CardAnunciantes } from "$/src/lib/components/molecules/card-anunciantes/card-anunciantes";
import prisma from "$/src/lib/prisma";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
  const slugInt = parseInt(slug);

  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: slugInt },
    select: {
      nome_empresa: true,
    },
  });

  return {
    title: `${anunciante.nome_empresa} - ${process.env.TITULO}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: slugInt },
  });

  const telefones = anunciante.telefone ? anunciante.telefone.split(",") : [];
  const usuariosFacebook = anunciante.facebook
    ? anunciante.facebook.split(",")
    : [];
  const usuariosWpp = anunciante.whatsapp ? anunciante.whatsapp.split(",") : [];
  const usuariosInstagram = anunciante.instagram
    ? anunciante.instagram.split(",")
    : [];
  const emails = anunciante.email ? anunciante.email.split(",") : [];
  const websites = anunciante.website ? anunciante.website.split(",") : [];

  anunciante.telefone = telefones;
  anunciante.facebook = usuariosFacebook;
  anunciante.whatsapp = usuariosWpp;
  anunciante.instagram = usuariosInstagram;
  anunciante.email = emails;
  anunciante.website = websites;

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">{anunciante.nome_empresa}</h2>
      </div>
      <div className="flex flex-col items-center gap-5 w-full ">
        <CardAnunciantes
          srcImage={anunciante.src_image}
          descricao={anunciante.descricao}
          endereco={anunciante.endereco}
          comBorda={false}
          contatos={{
            telefones: anunciante.telefone,
            facebook: anunciante.facebook,
            instagram: anunciante.instagram,
            whatsapp: anunciante.whatsapp,
            email: anunciante.email,
            website: anunciante.website
          }}
        />
      </div>
      <a href="/" className="underline">
        Volte para o início
      </a>
    </div>
  );
}
