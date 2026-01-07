"use server";

import { signOut, signIn, auth } from "@utils/auth";
import { redirect } from "next/navigation";

async function logout() {
  await signOut();
}
async function login(formData) {
  try {
    await signIn("credentials", formData);
    return redirect(`/gestao`);
  } catch (error) {
    return redirect(`/login?error=true`);
  }
}
async function getSession() {
  const session = await auth();
  return session;
}

export { logout, login, getSession };
