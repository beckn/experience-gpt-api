import express, { Router } from "express";
import { getLocationDetails } from "./controller";
import { response } from "../middleware/response";

const router: Router = express.Router();

export const routes = () => {
    router.post("/search", getLocationDetails, response);
    return router;
};
