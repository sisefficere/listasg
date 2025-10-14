import Link from "next/link";
import ButtonLogout from "@components/atoms/button-logout";

export default async function Home() {
  return (
    <header className="flex flex-col w-full items-center h-full lg:pt-3">
      <div className="flex flex-wrap w-full items-center h-full lg:rounded-xl justify-between estrutura-padding bg-vermelho-1-escuro max-md:pt-[45px] md:pt-5 pb-5 lg:shadow-[0_0_10px_rgba(255,153,153,1)]">
        <Link href="/">
          <img
            src="/logo-listasg.webp"
            alt=""
            className="w-full max-md:max-w-[70px] md:max-w-[100px]"
          />
        </Link>
        <nav className="flex">
          <ul className="flex gap-5 font-bold text-white">
            <li>
              <Link
                href="/anuncie"
                className="border-b-2 pb-[2px] px-[2px] border-verde-2-principal"
              >
                Anuncie
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="border-b-2 pb-[2px] px-[2px] border-verde-2-principal"
              >
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
        <ButtonLogout/>
      </div>
    </header>
  );
}
