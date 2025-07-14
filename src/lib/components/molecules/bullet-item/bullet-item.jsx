import Link from "next/link";

export function BulletItem({ href, nome }) {
  return (
    <Link
      href={href}
      className="px-5 py-2 text-white transition-all duration-300 hover:bg-azul-2-principal hover:border-azul-1-escuro bg-azul-1-escuro border-azul-2-principal rounded-[5px] border-2 flex items-center gap-[10px] w-full max-w-[300px]"
    >
      <svg
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        className="fill-white w-full max-w-[15px]"
      >
        <path
          d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
          id="XMLID_294_"
        />
        <path
          d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
          id="XMLID_295_"
        />
        <path
          d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
          id="XMLID_297_"
        />
      </svg>
      <p>{nome}</p>
    </Link>
  );
}
