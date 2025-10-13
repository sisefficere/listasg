"use client";

import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import Paginacao from "../../molecules/paginacao/paginacao";

export default function Categorias({ categorias, totalItems, perPage }) {
  return (
    <div className="flex flex-col gap-5">
      <ul className="max-md:flex max-md:flex-wrap md:grid md:grid-cols-3 justify-center gap-[10px] w-full">
        {categorias.map((el) => (
          <BulletItem key={el.id} href={`/categoria/${el.id}`} nome={el.nome} />
        ))}
      </ul>
      <Paginacao totalItems={totalItems} perPage={perPage}/>
    </div>
  );
}
