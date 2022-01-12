import express, { Express } from "express";
function bodyParse(app: Express) {
  app.use(express.json()); // Aqui está configurando o body-parse
}
export default bodyParse;
