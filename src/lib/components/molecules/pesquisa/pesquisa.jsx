"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Pesquisa({ placeholder = "Ex.: 'sm', 'nutrimais', etc" }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Pesquisando por ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-col w-full gap-2">
        <label htmlFor="campo-pesquisa-home" className="tipo-enfase">Pesquise por anunciante: </label>
        <input
            id="campo-pesquisa-home"
          className="w-full pl-5 py-[10px] rounded-md border border-vermelho-2-principal text-sm placeholder:text-shadow-branco-2"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
    </div>
  );
}
