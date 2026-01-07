import { getSession } from "@actions/handle-session";
import LogoutButton from "@components/atoms/logout-button";
import FormLogin from "@components/molecules/form-login";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login - ListaSG",
};

export default async function Login() {
  const session = await getSession();
  if (session?.user) {
    return redirect("/gestao");
  }

  return (
    <div className="flex flex-col gap-5 w-full items-center justify-center">
      <h1 className="tipo-titulo1">Área restrita</h1>
      <FormLogin />
    </div>
  );
}
