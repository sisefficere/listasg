import prisma from "@utils/prisma"
import bcrypt from 'bcrypt'


export default async function checkCredentials(email, senha){

    const usuario = await prisma.usuario.findUnique({
        where:{
            email
        }
    })

    // console.log(usuario) 
    const dadosEstaoCorretos =  await bcrypt.compare(senha, usuario.senha)

    return dadosEstaoCorretos ? usuario : dadosEstaoCorretos
}