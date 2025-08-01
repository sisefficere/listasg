'use client'
import handleSearch from "$/src/lib/core/utils/handle-search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Paginacao({cursor}){
      const searchParams = useSearchParams();
    const paramsPage = new URLSearchParams(searchParams);
const pathname = usePathname();
  const { replace } = useRouter();
    

    return(
        <div className={`flex flex-wrap gap-2 justify-between items-center`}>
        {paramsPage.has("catPage") && paramsPage.get("catPage") > 0 ? (
          <button
            className="cursor-pointer"
            onClick={() => {
              handleSearch(paramsPage, pathname, replace, cursor, true);
            }}
          >
            Página anterior
          </button>
        ) : (
          <button
            className="text-black/20"
          >
            Página anterior
          </button>
        )}
        {paramsPage.has("catPage") && paramsPage.get("catPage") > 0 ? (
          <button
            className="cursor-pointer"
            onClick={() => {
              handleSearch(paramsPage, pathname, replace);
            }}
          >
            Início
          </button>
        ) : (
          <button
            className="text-black/20"
          >
            Início
          </button>
        )}

        {cursor ? (
          <button
            className="cursor-pointer"
            onClick={() => {
              handleSearch(paramsPage, pathname, replace, cursor);
            }}
          >
            Próxima página
          </button>
        ) : (
          <button
            className="text-black/20"
          >
            Próxima página
          </button>
        )}
      </div>
    )
}