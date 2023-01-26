import { login, singUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { signUpSchema, userSchema } from "../schema/AuthSchema.js"

const authRouter = Router()

// Rotas de autenticação
authRouter.post("/login", validateSchema(userSchema), login)
authRouter.post("/sign-up", validateSchema(signUpSchema), singUp)

export default authRouter