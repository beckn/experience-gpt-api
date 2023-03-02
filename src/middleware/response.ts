import { Request, Response } from "express";

export const response = (req: Request, res: Response) => {
    const { data, status = 200, success = true, message = "" } = res.locals || {};
    res
        .status(status || (success ? 200 : 500))
        .json({
            data,
            success,
            message: message || (success ? "" : "Oops! Something went wrong."),
        });
};