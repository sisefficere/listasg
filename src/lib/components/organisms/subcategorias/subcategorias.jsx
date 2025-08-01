"use client";

import { BulletItem } from "$/src/lib/components/molecules/bullet-item/bullet-item";
import Paginacao from "../../molecules/paginacao/paginacao";

export default function Subcategorias({ subcategorias }) {
  
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-wrap justify-center gap-[10px] w-full">
        {subcategorias.map((el) => (
          <BulletItem key={el.id} href={`/subcategoria/${el.id}`} nome={el.nome} />
        ))}
      </ul>
      <Paginacao cursor={subcategorias[9]?.id}/>
    </div>
  );
}
