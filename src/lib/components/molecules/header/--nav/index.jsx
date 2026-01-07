"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("gestao") && (
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
      )}
    </>
  );
}
