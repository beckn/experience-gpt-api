import { Request, Response, NextFunction } from "express";
import manali from '../responses/manali.json'
import himalya from '../responses/himalya.json'
import baseCamp from '../responses/evrestBaseCamp.json'
import defaultData from "../responses/default_response.json";




export const getLocationDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        let location = req.body.message.searchQuery
        location = location.toLowerCase()
        if (!location) {
            return res.status(404).json({
                "error": {
                    "code": "4XX",
                    "message": "Response could not be generated",
                    "data": "Long descriptive message",
                    "type": "Application error",
                    "path": "/v1/search"
                }
            })
        }
        if (location.includes('himalaya')) {
            return res.status(200).json(himalya)
        }
        if (location.includes('manali')) {
            return res.status(200).json(manali)
        }
        if (location.includes('camp')) {
            return res.status(200).json(baseCamp)
        }
        return res.status(200).json(defaultData)
    }
    catch (e) {
        return res.status(500).json({
            "error": {
                "code": "5XX",
                "message": "Error processing request {specific error log from exception/error}",
                "data": "Additional error message/logs",
                "type": "System error",
                "path": "/v1/search"
            }
        })
    }
};