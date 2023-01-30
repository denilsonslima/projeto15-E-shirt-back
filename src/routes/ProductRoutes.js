import { Router } from "express";
import { pegarProduto, criarProduto } from "../controller/Product.js";

const productRouter = Router()

productRouter.post("/product", criarProduto)
productRouter.get("/product", pegarProduto)

export default productRouter