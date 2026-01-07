import Link from "next/link";
import HeaderAdminBar from "@components/molecules/header/--admin-bar";
import BreadcrumbShadcn from "../breadcrumb-shadcn";
import Nav from "./--nav";

export default async function Home() {
  return (
    <div>
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
            <div className="flex flex-col gap-5 items-end">
              <Nav />
              <HeaderAdminBar />
            </div>
          </div>
        </div>
      </header>
      <BreadcrumbShadcn />
    </div>
  );
}
