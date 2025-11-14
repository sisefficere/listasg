export async function generateMetadata({ params }) {
  return {
    title: `Anuncie - ${process.env.TITULO}`,
  };
}

export default function Contato() {
  return (
    <div className="flex flex-col items-center justify-center gap-[50px] w-full">
      <div className="flex flex-col w-full items-center">
        <h2 className="tipo-titulo2">Anuncie conosco</h2>
      </div>
      <div className="flex flex-col gap-5 max-w-[40rem]">
        <p>
          Somos uma empresa qualificada para divulgar e promover a sua empresa ou profissão
          na web.
        </p>
        <p>
          São mais de 3 mil acessos mensais!
        </p>
        <p>Chegamos a anunciar 89% das empresas e profissionais da cidade</p>
        <p>Não perca essa chance, anuncie agora mesmo!</p>
        <div>
          <p>Entre em contato:</p>
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
