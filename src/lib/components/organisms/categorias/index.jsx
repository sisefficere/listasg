"use client";

import { BulletItem } from "@components/molecules/bullet-item";
import Paginacao from "@components/molecules/paginacao";

export default function Categorias({ categorias, totalItems, perPage, pagina = "/" }) {
  return (
    <div className="flex flex-col gap-5">
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-2.5 w-full">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categorias/${el.id}`} nome={el.nome} />
        ))}
      </ul>
      <Paginacao totalItems={totalItems} perPage={perPage} pagina={pagina}/>
    </div>
  );
}
