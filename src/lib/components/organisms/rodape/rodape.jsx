export default async function Rodape(){
    const now = new Date()
    const ano = now.getFullYear()

    return(
        <footer className="flex flex-col text-xs font-extralight w-full items-center justify-center">
            <hr className="border-1 w-full border-branco-1-escuro/20 mb-5" />
            <p>v1.0.0</p>
            <p>&copy; {ano} <a href="https://sisefficere.com.br" className="decoration-solid underline ">Efficere</a> </p>
        </footer>
    )
}