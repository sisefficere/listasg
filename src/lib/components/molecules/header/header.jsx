export default async function Home() {
  return (
    <header className="flex flex-col w-full items-center h-full">
      <div className="flex flex-wrap w-full items-center h-full justify-center estrutura-padding bg-vermelho-1-escuro pt-[45px] pb-5">
        <a href="/">
          <img
            src="/logo-listasg.webp"
            alt=""
            className="w-full max-w-[100px]"
          />
        </a>
        {/*
        <nav>
          <ul className="flex gap-2 tipo-enfase text-white">
            <li>Anúncios</li>
            <li>|</li>
            <li>Categorias</li>
          </ul>
        </nav>
        */}
      </div>
      {/*
      <nav className="flex w-full justify-end bg-vermelho-3 p-2">
        <ul className="flex gap-2 tipo-rodape">
          <li>Anuncie</li>
          <li>Contato</li>
          <li>Sobre</li>
        </ul>
      </nav>
      */}
    </header>
  );
}
