import { object, string, z } from "zod";

export const signInSchema = object({
  email: z
    .email({ required_error: "E-mail is required" }, "Invalid email")
    .min(1, "Email is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const cadastroAnunciante = object({
  nome_empresa: z.string().max(60, "Limite de 60 caracteres!").min(1, "E-mail é obrigatório!"),
  slug: z.string().max(30),
  descricao: z.string().max(500),
  endereco: z.string().max(100),
  end_ref: z.string().max(30),
  telefone: z.string().min(10, "Telefone é obrigatório!").max(11),
  src_image: z.url(),
  idCategoria: z.int().min(1, "Categoria é obrigatória"),
  idSubcategoria: z.int(),
  email: z.email(),
  instagram: z.string().max(30),
  facebook: z.string().max(30),
  whatsapp: z.string().min(10).max(11).optional(),
  website: z.url()
});
