import unless from "express-unless";
import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

function middlewareUser(req: any, res: Response, next: NextFunction) {
  let token = "" + req.headers.authorization;
  token = token.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });
  console.log(token);
  jwt.verify(
    token,
    process.env.secretToken,
    function (err: any, decoded: { id: any; secureId: any }) {
      if (err)
        return res
          .status(401)
          .json({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      req.secureId = decoded.secureId;
      next();
    }
  );
}

middlewareUser.unless = unless;

export default middlewareUser;
