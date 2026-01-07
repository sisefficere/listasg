'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PainelButton() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("admin") && (
        <Link
          href="/gestao"
          className="flex justify-center gap-2 items-center lsg-botao--feature"
        >
          <svg viewBox="0 0 24 24" className="fill-branco-1-escuro w-[20px]">
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
          </svg>
          <span>Painel</span>
        </Link>
      )}
    </>
  );
}
