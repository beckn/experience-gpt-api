import { Request, Response, NextFunction } from "express";
import manaliData from '../responses/manali.json'
import himalyaData from '../responses/himalya.json'
import baseCampData from '../responses/evrestBaseCamp.json'
import defaultData from "../responses/default_response.json";

const obj: any = { "manali trip": manaliData, "himalaya trek": himalyaData, "everest base camp": baseCampData }




export const getLocationDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        let location: any = req.body.message.searchQuery
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
        if (location) {
            return res.status(200).json(obj[location.toLowerCase()])
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