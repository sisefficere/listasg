import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import { CardAnunciantes } from "$/src/lib/components/molecules/card-anunciantes/card-anunciantes";
import prisma from "$/src/lib/prisma";


export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
  const slugInt = parseInt(slug);

  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: slugInt },
    select:{
      nome_empresa: true
    }
  });
 
  return {
    title: `${anunciante.nome_empresa} - ${process.env.TITULO}`
  }
}
 
export default async function Page({ params }) {
  
  const { slug } = await params;
  const slugInt = parseInt(slug);
  const anunciante = await prisma.anunciantes.findUnique({
    where: { id: slugInt },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-[50px] estrutura-padding w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">{anunciante.nome_empresa}</h2>
      </div>
      <div>
        <div className="flex flex-col items-center gap-5 w-full ">
            <CardAnunciantes
              srcImage={anunciante.src_image}
              nome={anunciante.nome_empresa}
              descricao={anunciante.descricao}
              endereco={anunciante.endereco}
              contato={anunciante.contato}
            />
          <a href="/" className="underline">
            Volte para o início
          </a>
        </div>
      </div>
    </div>
  );
}
