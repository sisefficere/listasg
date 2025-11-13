import Link from "next/link";
import HeaderAdminBar from "@components/molecules/header/--admin-bar";

export default async function Home() {
  return (
    <header className="flex flex-col w-full items-center h-full lg:pt-3">
      <div className="flex flex-col w-full gap-2 items-end h-full lg:rounded-xl max-lg:px-5 lg:px-10 bg-vermelho-1-escuro max-md:pt-[45px] md:pt-5 pb-5 lg:shadow-[0_0_10px_rgba(255,153,153,1)]">
        <div className="flex w-full gap-5 items-center justify-between">
          <Link href="/">
            <img
              src="/logo-listasg.webp"
              alt=""
              className="w-full min-w-[70px] max-md:max-w-[70px] md:max-w-[100px]"
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
        </div>
        <HeaderAdminBar />
      </div>
    </header>
  );
}
