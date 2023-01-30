import db from "../config/database.js";
import joi from "joi";

export async function criarProduto(req, res) {
    const {name, valor, loja, url} = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim()

    if (!token) return res.status(422).send("Informe o token!")

    const userSchema = joi.object({
        name: joi.string().required(),
        valor: joi.number().required(),
        loja: joi.string().required(),
        url: joi.string().required()
    });

    const {error} = userSchema.validate({name, valor, loja, url}, { abortEarly: false })
    if (error) {
        const err = error.details.map((err) => err.message)
        return res.status(422).send(err)
    }

    try {
        const existe = await db.collection("sessoes").findOne({token: token})
        if(!existe) return res.sendStatus(422)

        await db.collection("product").insertOne({name, valor, loja, url, idUser: existe.idUser})
        res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function pegarProduto(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim()

    try {
        const user = await db.collection("sessoes").find({token: token}).toArray()
        if(!user) return res.sendStatus(422)

        const dadosUser = await db.collection("/product").find({idUser: user.idUser}).toArray()
        res.send(dadosUser)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}