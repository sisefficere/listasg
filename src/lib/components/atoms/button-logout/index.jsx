import { signOut, auth } from "@utils/auth";
import Link from "next/link";

export default async function ButtonLogout() {
  const session = await auth();

  // se o usuário não estiver logado, não renderiza o componente (retorna null)
  // if (!session?.user) return null;

  return (
    <>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" className="cursor-pointer">Sign Out</button>
        </form>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
