import CookiesConsent from "../../molecules/cookies-consent.jsx/cookies-consent";

export default async function Rodape() {
  const now = new Date();
  const ano = now.getFullYear();

  return (
    <>
      <footer className="flex flex-col tipo-rodape font-extralight gap-5 w-full items-center justify-center">
        <hr className="border-1 w-full border-branco-1-escuro/20" />
        <div className="flex flex-col items-center gap-1">
        <p>v1.0.0</p>
        <p>
          CNPJ 39.463.752/0001-24 |{" "}
          <a href="/privacidade" className="link">
            Política de privacidade
          </a>
        </p>
        <p>
          &copy; {ano}{" "}
          <a
            href="https://sisefficere.com.br"
            className=""
            target="_blank"
          >
            Efficere<span className="text-[5px]">ADTG</span>
          </a>{" "}
        </p>
        </div>
      </footer>
      {/*
      */}
      
        <CookiesConsent />
    </>
  );
}
