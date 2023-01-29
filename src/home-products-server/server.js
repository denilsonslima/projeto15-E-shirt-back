import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from '../config/database.js';

dotenv.config();

/*MEU .ENV QUE TAVA TENTANDO USAR ERA LOCAL PADRÃO QUE NEM OS OUTROS PROJETOS:
MONGO_URL= mongodb://localhost:27017/dbShirt
PORT= 5000*/

const server = express();
server.use(express.json());
server.use(cors());
server.listen(process.env.PORT);

server.get('/showCase', async(req, res) => {
    try{
        const getData = await db.collection('showCase').find().toArray();
        return res.send(getData);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
});