import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'

export async function login(req, res){
    const {email, password} = req.body
    try {
        const existe = await db.collection("users").findOne({email})
    
        if(existe  && bcrypt.compareSync(password, existe.password)){
            const token = uuidV4()
            const idUser = await db.collection("sessoes").findOne({idUser: existe._id})
            if(idUser?.idUser){
                await db.collection("sessoes").updateOne({idUser: idUser.idUser}, {$set: {token: token}})
            } else {
                await db.collection("sessoes").insertOne({idUser: existe._id, token})
            } 
            res.send({token: token, name: existe.name})
        } else {
            res.status(400).send("Usuário ou senha incorretos!")
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function singUp(req, res){
    const {email, password, name} = req.body
    try {
        const existe = await db.collection("users").findOne({ email })
        if (existe) return res.status(400).send("E-mail já cadastrado!!")
    
        const senhaCriptografada = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({name, email, password: senhaCriptografada})
        res.status(201).send("Usuário cadastrado!")
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}