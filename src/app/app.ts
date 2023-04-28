import express, {
    Express,
    Router,
    Request,
    Response,
    NextFunction
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from ".";
import { locationRoutes } from "./routes";

interface InitAppParams {
    app: Express;
}

const initApp = ({ app }: InitAppParams) => {
    const router: Router = express.Router();
    dotenv.config();
    app.use(cors());
    app.set("trust proxy", true);
    app.use(express.urlencoded({ extended: true, limit: "200mb" }));
    app.use(express.json({ limit: "200mb" }));
    app.use(router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (process.env.NODE_ENV === "dev") {
            console.log("Error", err);
            res.status(500).json({
                message: err?.message,
                err
            });
        } else {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });

    const port: string = process.env.PORT || "3007";
    router.use("/ping", async (req: Request, res: Response) => {
        await res.json({
            status: 200,
            message: "Ping successfully",
            deployMessage: "Removed validation for description in project create"
        });
    });
    router.use("/v1", routes());
    router.use("/v2", locationRoutes())

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

export { initApp };