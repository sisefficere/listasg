import { signIn } from "$/auth"
 
export default function FormLogin() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData, { redirectTo: "/" })
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