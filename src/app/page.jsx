import prisma from '$/src/lib/prisma'

export default async function Home() {
  const anunciantes = await prisma.anunciantes.findMany();
  const classificacoes = await prisma.classificacoes.findMany();
  const categorias = await prisma.categorias.findMany();
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className='tipo-titulo1'>Seja bem vindo!</h1>
      <p className='tipo-subtitulo'>Escolha uma categoria</p>
      <ul>
        {categorias.map((el)=>{
          
        })}
      </ul>
    </div>
  );
}