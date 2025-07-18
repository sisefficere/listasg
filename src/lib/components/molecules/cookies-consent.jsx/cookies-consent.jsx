"use client";

import { useState, useEffect } from "react";

export function cookieConsentimento() {
    if (!localStorage.getItem("cookie_consent")) {
      return "nao";
    }
    return localStorage.getItem("cookie_consent");
  }

export default function CookiesConsent() {
  const [consentimento, setConsentimento] = useState("");

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentimento(cookieConsentimento());
  }, []);

  function hideModalFlexHidden(id, overflow = false) {
    document.getElementById(id).classList.remove("flex");
    document.getElementById(id).classList.add("hidden");
    if (!overflow) {
      document.body.style = "overflow: auto";
    }
  }

  const lidaConsentimento = () => {
    localStorage.setItem("cookie_consent", "sim");
    setConsentimento("sim");
  };


  return (
    <>
      {consentimento === "nao" && (
        <div
          id="cookies-consent"
          className="estrutura-padding fixed w-full border-t-10 border-laranja-3 bottom-0 left-0 py-10 bg-laranja-2-principal text-branco z-50000"
        >
          <div className="flex max-md:flex-col md:justify-around gap-[20px]">
            <div className="flex flex-col gap-[10px] max-w-240">
              <div className="flex flex-col gap-[2px]">
                <h3 className="tipo-titulo3">Nosso site utiliza cookies</h3>
                <p className="tipo-subtitulo">
                  Cookies são dados úteis para os computadores
                </p>
              </div>
              <p className="tipo-rodape">
                Os dados que armazenamos são públicos, não individuais, não
                personalizados e utilizados somente para fins de anúncios e
                análise de interações com o site. Não armazenamos dados
                sensíveis nem mesmo dados pessoais. Ao continuar navegando pelo
                site você dá consentimento para o armazenamento destes dados.
              </p>
              <p className="tipo-rodape">
                Consulte nossos{" "}
                <a href="/privacidade" className="link">
                  termos de privacidade e LGPD
                </a>
                .
              </p>
            </div>
            <button
              className="cursor-pointer px-5 py-2 bg-verde-2-principal shadow-md rounded-md w-full sm:max-w-[150px]"
              onClick={() => {
                hideModalFlexHidden("cookies-consent", true);
                lidaConsentimento();
              }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
