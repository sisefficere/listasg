import Link from "next/link";

export default async function Admin() {
  return (
    <div className="container w-full flex flex-col gap-10">
      <h1 className="tipo-titulo1">Área de administração</h1>
      <div className="flex flex-col gap-2">
        <h2 className="tipo-enfase">Navegue pelas configurações:</h2>
        <div className="flex flex-col gap-1">
          <Link href="/admin/anunciantes" className="link">Anunciantes</Link>
          {/* <Link href="/admin/anuncios">Anúncios</Link> */}
          <Link href="/admin/taxonomia" className="link">Categorias</Link>
        </div>
      </div>
    </div>
  );
}
