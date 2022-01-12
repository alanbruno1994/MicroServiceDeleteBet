import express from "express";
import bodyParse from "../middleware/bodyParse";
import setupRouter from "./configRouter";
import setupGraphQl from "./setupGraphQl";
const app = express();
bodyParse(app);
setupGraphQl(app);
setupRouter(app);
export default app;
