import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import getCredentials from "./src/actions/get-credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

// Credenciais (em 12 rounds):
// $2a$12$yCjjVJdrFg02nxeBgfBZAewUeO37PGHE1gIL3AHSzo/j7SnVhTVbu hash para a senha listasg2023@!
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
        authorize: async (credentials) => {
          try {
            let isPasswordValid = null;

            const { email, password } = await signInSchema.parseAsync(
              credentials
            );

            isPasswordValid = await getCredentials(email, password);

            if (!isPasswordValid) {
              // No user found, so this is their first attempt to login
              // Optionally, this is also the place you could do a user registration
              throw new Error("Invalid credentials.");
            }

            // return user object with their profile data
            return user;
          } catch (error) {
            if (error instanceof ZodError) {
              // Return `null` to indicate that the credentials are invalid
              return null;
            }
          }
        },
      },
    }),
  ],
});
