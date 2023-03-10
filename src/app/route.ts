import express, { Router } from "express";
import { getLocationDetails, GptOpenAi } from "./controller";
import { response } from "../middleware/response";

const router: Router = express.Router();

export const routes = () => {
    router.post("/search", getLocationDetails, response);
    return router;
};

export const locatonRoutes = () => {
    router.post("/search", GptOpenAi, response)
    return router
}