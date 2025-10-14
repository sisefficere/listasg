import { signIn } from "@utils/auth"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

 
export default function FormLogin() {
  return (
    <form
      action={async (formData) => {
        "use server"
        const res = await signIn("credentials", formData, {redirectTo: '/'});
        console.log(res)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}