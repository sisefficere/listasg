"use client";
import handlePaginationCursorQParams from "$/src/lib/core/utils/handle-pagination-cursor-qparams";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Paginacao({ cursor }) {
  const searchParams = useSearchParams();
  const paramsPage = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className={`${cursor || paramsPage.has("catPage") ? "flex" : "hidden"} flex-wrap gap-2 justify-between`}>
      {paramsPage.has("catPage") && paramsPage.get("catPage") > 0 ? (
        <Link
          className="lsg-botao"
          onClick={() => {
            handlePaginationCursorQParams(
              paramsPage,
              pathname,
              replace,
              cursor,
              true
            );
          }}
        >
          <svg viewBox="0 0 21 32" fill="none" className="rotate-180 w-[15px]">
            <path
              d="M18.3422 17.0607L6.19574 29.2071C5.60993 29.7929 4.66018 29.7929 4.07443 29.2071L2.65774 27.7904C2.07293 27.2056 2.07181 26.2578 2.65524 25.6716L12.2816 16L2.65524 6.32844C2.07181 5.74225 2.07293 4.79444 2.65774 4.20963L4.07443 2.79294C4.66024 2.20713 5.60999 2.20713 6.19574 2.79294L18.3422 14.9394C18.928 15.5251 18.928 16.4749 18.3422 17.0607Z"
              fill="white"
            />
          </svg>
          <span>Anterior</span>
        </Link>
      ) : (
        <button className="lsg-botao--desativado">
          <svg viewBox="0 0 21 32" fill="none" className="rotate-180 w-[15px]">
            <path
              d="M18.3422 17.0607L6.19574 29.2071C5.60993 29.7929 4.66018 29.7929 4.07443 29.2071L2.65774 27.7904C2.07293 27.2056 2.07181 26.2578 2.65524 25.6716L12.2816 16L2.65524 6.32844C2.07181 5.74225 2.07293 4.79444 2.65774 4.20963L4.07443 2.79294C4.66024 2.20713 5.60999 2.20713 6.19574 2.79294L18.3422 14.9394C18.928 15.5251 18.928 16.4749 18.3422 17.0607Z"
              fill="white"
            />
          </svg>
          <span>Anterior</span>
        </button>
      )}

      {paramsPage.has("catPage") && paramsPage.get("catPage") > 0 ? (
        <button
          className="lsg-botao"
          onClick={() => {
            handlePaginationCursorQParams(paramsPage, pathname, replace);
          }}
        >
          Início
        </button>
      ) : (
        <button className="lsg-botao--desativado">Início</button>
      )}

      {cursor ? (
        <button
          className="lsg-botao"
          onClick={() => {
            handlePaginationCursorQParams(
              paramsPage,
              pathname,
              replace,
              cursor
            );
          }}
        >
          <span>Próximo</span>
          <svg viewBox="0 0 21 32" fill="none" className="w-[15px]">
            <path
              d="M18.3422 17.0607L6.19574 29.2071C5.60993 29.7929 4.66018 29.7929 4.07443 29.2071L2.65774 27.7904C2.07293 27.2056 2.07181 26.2578 2.65524 25.6716L12.2816 16L2.65524 6.32844C2.07181 5.74225 2.07293 4.79444 2.65774 4.20963L4.07443 2.79294C4.66024 2.20713 5.60999 2.20713 6.19574 2.79294L18.3422 14.9394C18.928 15.5251 18.928 16.4749 18.3422 17.0607Z"
              fill="white"
            />
          </svg>
        </button>
      ) : (
        <button className="lsg-botao--desativado">
          <span>Próximo</span>
          <svg viewBox="0 0 21 32" fill="none" className="w-[15px]">
            <path
              d="M18.3422 17.0607L6.19574 29.2071C5.60993 29.7929 4.66018 29.7929 4.07443 29.2071L2.65774 27.7904C2.07293 27.2056 2.07181 26.2578 2.65524 25.6716L12.2816 16L2.65524 6.32844C2.07181 5.74225 2.07293 4.79444 2.65774 4.20963L4.07443 2.79294C4.66024 2.20713 5.60999 2.20713 6.19574 2.79294L18.3422 14.9394C18.928 15.5251 18.928 16.4749 18.3422 17.0607Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
