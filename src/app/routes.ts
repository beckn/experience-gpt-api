import express, { Router } from "express";
import { GptOpenAi } from "./controller";
import { response } from "../middleware/response";

const router: Router = express.Router();

export const locationRoutes = () => {
    router.post("/search", GptOpenAi, response)
    return router
}