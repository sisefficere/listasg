export async function generateMetadata({ params }) {
  return {
    title: `Sobre nós - ${process.env.TITULO}`,
  };
}

export default function Sobre() {
  return (
    <div className="flex flex-col items-center justify-center gap-[50px] w-full ">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">Sobre nós</h2>
      </div>
      <div className="flex flex-col gap-5  max-w-[40rem]">
        <p>
          Tudo começou há 30 anos com a Lista Telefônica Municipal idealizada e mantida por Leopoldo Rottman.
        </p>
        <p>Com a evolução da web e dos serviços digitais, tornou-se necessário entrar no mundo virtual.</p>
        <p>Há 2 anos o projeto ListaSG está em vigor, promovendo na internet os empresários e profissionais liberais do município.</p>
        <p>Mensalmente recebemos em torno de 3 mil acessos e chegamos a anunciar 89% das empresas e profissionais da cidade (somando o meio digital com o físico)</p>
        <div>
          <p>Não deixe sua empresa fora do mundo digital, entre em contato:</p>
          <ul className="pl-5 list-disc">
            <li>
              <a
                className="link"
                href="https://wa.me/555599094159?text=Ol%C3%A1%21%20Vim%20pela%20p%C3%A1gina%20de%20contato%20do%20site%20listasg.com.br.%20Queria%20saber%20mais%20informa%C3%A7%C3%B5es%21%20%5BN%C3%83O%20EXCLUA%5D"
              >
                Chamar no whatsapp
              </a>
            </li>
            <li>
              <a className="link" href="tel:05599094159">
                Ligar
              </a>
            </li>
            <li>
              <a
                className="link"
                href="mailto:listatelefonicamunicipal@gmail.com"
              >
                Enviar e-mail
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
