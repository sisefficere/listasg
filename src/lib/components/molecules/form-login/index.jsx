"use client";

import { login } from "@actions/handle-session";
import { useSearchParams } from "next/navigation";
import Form from "next/form";

export default function FormLogin() {
  const params = useSearchParams();
  const error = params.has("error") ? params.get("error") : false;
  return (
    <Form
      action={login}
      className="flex flex-col items-center gap-10 w-full max-w-125 px-5 py-10   rounded-2xl"
    >
      <div className="flex flex-col gap-5 w-full">
        <label className="flex flex-col justify-center gap-2 cursor-pointer">
          <span className="tipo-enfase">E-mail</span>
          <input
            name="email"
            type="email"
            className="lsg-input-text"
            placeholder="Exemplo: fulano@email.com"
          />
        </label>
        <label className="flex flex-col justify-center gap-2 cursor-pointer">
          <span className="tipo-enfase">Senha</span>
          <input
            name="password"
            type="password"
            className="lsg-input-text"
            placeholder="Digite sua senha"
          />
        </label>
      </div>
      <button className="lsg-botao--login" type="submit">
        Entrar
      </button>
      {error && (
        <div className="p-5 bg-vermelho-2-principal rounded-lg shadow-lg text-branco-4-claro-principal flex flex-col justify-center items-center">
          <p className="tipo-enfase">Erro no login!</p>
          <p>E-mail ou senha errados, tente novamente.</p>
        </div>
      )}
    </Form>
  );
}
