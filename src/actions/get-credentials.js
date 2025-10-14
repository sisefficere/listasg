import prisma from "../lib/prisma"
import bcrypt from 'bcryptjs'


export default async function getCredentials(email, senha){
    const salt = await bcrypt.genSalt(12);
    const senhaEncriptada = await bcrypt.hash(senha, salt)

    const usuario = await prisma.usuario.findUnique({
        where:{
            email:{
                equals: email
            }
        }
    })

    const estadoLogin = await bcrypt.compare(senhaEncriptada, usuario.senha)

    return{estadoLogin}
}