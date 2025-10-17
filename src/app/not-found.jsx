import Link from "next/link";

export default function NotFound(){

    return(
        <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="tipo-titulo1">Conteúdo não encontrado</h1>
        <p>Por favor, tente novamente ou <Link href="/" className="link">retorne para a página inicial</Link>.</p>
        </div>
    )
}