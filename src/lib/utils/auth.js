import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import checkCredentials from "@actions/check-credentials";
import { ZodError } from "zod";
import { signInSchema } from "@utils/zod";
import { redirect } from "next/navigation";

// https://medium.com/@arunchaitanya/salting-and-hashing-passwords-with-bcrypt-js-a-comprehensive-guide-f5e31de3c40c, basicamente utiliza await bcrypt.compare(password, storedHashedPassword) onde o storedHashed é a has no BD

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "fulano@email.com",
        },
        password: {
          type: "password",
          label: "Senha",
          placeholder: "******",
        },
      },
      async authorize({ email, password }){
        try {
          let usuario = null;

          // const { emailValidated, passwordValidated } = await signInSchema.parseAsync(
          //   {email,password}
          // );

          usuario = await checkCredentials(email, password);

          if (!usuario) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }else{
            return usuario
          }
        } catch (error) {
          console.log(error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
