import { Express } from "express";
import routerLogin from "../router/login";
export default function setupRouter(app: Express) {
  app.use(routerLogin);
}
