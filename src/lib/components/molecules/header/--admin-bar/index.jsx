import { getSession } from "@actions/handle-session";
import LoginButton from "@components/atoms/login-button";
import LogoutButton from "@components/atoms/logout-button";
import PainelButton from "@components/atoms/painel-button";

export default async function ButtonLogout() {
  const session = await getSession();

  return (
    <>
      {session?.user ? (
        <div className="flex flex-wrap justify-end items-center gap-2 w-full">
          <PainelButton/>
          <LogoutButton inAdminBar={true}/>
        </div>
      ) : (
        <LoginButton/>
      )}
    </>
  );
}
