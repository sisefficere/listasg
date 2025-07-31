"use client";

import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Categorias({ categorias }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const paramsPage = new URLSearchParams(searchParams);
  
  const handleSearch = (term, voltar) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("cursor", term);
      if (!paramsPage.has("catPage")) {
        params.set("catPage", `1`);
      }else if ( paramsPage.get("catPage") != 1 && !voltar){
        params.set("catPage", `${Number(paramsPage.get("catPage")) + 1}`);

      }
    } else {
      params.delete("cursor");
    }
    if (voltar) {
      params.set("voltar", voltar);
      params.set("catPage", `${Number(paramsPage.get("catPage")) - 1}`);
    } else {
      params.delete("voltar");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-[10px] w-full">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categoria/${el.id}`} nome={el.nome} />
        ))}
      </ul>
      {paramsPage.has("catPage") && paramsPage.get("catPage") > 0 ? (
        <button
          className="cursor-pointer"
          onClick={() => {
            handleSearch(categorias[9]?.id, true);
          }}
        >
          Página anterior
        </button>
      ) : (
        <></>
      )}

      <button
        className="cursor-pointer"
        onClick={() => {
          handleSearch(categorias[9]?.id);
        }}
      >
        Próxima página
      </button>
    </>
  );
}
