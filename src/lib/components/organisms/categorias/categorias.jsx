"use client";

import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export default async function Categorias({ categorias }) {
    const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("cursor", term);
      } else {
        params.delete("cursor");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <>
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-[10px] w-full">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categoria/${el.id}`} nome={el.nome} />
        ))}
      </ul>
      <button
        className="cursor-pointer"
        onClick={() => {
          handleSearch(categorias[9]?.id)
        }}
      >
        Ver mais
      </button>
    </>
  );
}
