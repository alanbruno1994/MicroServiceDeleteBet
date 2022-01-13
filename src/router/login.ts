import { Router, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../database/models/user";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const routerLogin = Router();

routerLogin.use("/login", async (req: any, response: Response) => {
  const value: any = await User.findOne({
    where: { email: req.body.email },
  });
  console.log(value);
  if (await bcrypt.compare(req.body.password, value.password)) {
    // Aqui usa a lib bcrypt  para comparar a senha com a senha criptografada
    const token = await jwt.sign(
      { id: value.id, secureId: value.secureId },
      process.env.secretToken,
      { expiresIn: "24h" }
    ); // Aqui gera o token
    return response.status(200).send({ token });
  }
  return response.status(401).send({ msg: "Login Failure" });
});

export default routerLogin;
