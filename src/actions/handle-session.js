'use server'

import { signOut, signIn, auth } from "@utils/auth";
import { redirect } from "next/navigation";

async function logout(){
    await signOut();
}
async function login(formData){
   await signIn("credentials", formData);
}
async function getSession(){
    const session = await auth();
    return session;
}

export {
    logout,
    login,
    getSession
}