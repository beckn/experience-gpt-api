import { Request, Response, NextFunction } from "express";
import manaliData from '../responses/manali.json'
import himalyaData from '../responses/himalya.json'
import baseCampData from '../responses/evrestBaseCamp.json'
import defaultData from "../responses/default_response.json";

const obj: any = { "manali": manaliData, "himalaya": himalyaData, "everest": baseCampData }




export const getLocationDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`Recived request for ${req.body.message.searchQuery}`)
        let location: any = req.body.message.searchQuery
        location = location.toLowerCase()
        if (!location) {
            return res.status(404).json({
                "error": {
                    "code": "400",
                    "message": "Please provide correct location",
                    "data": "Long descriptive message",
                    "type": "Application error",
                    "path": "/v1/search"
                }
            })
        }
        let data = obj[location.toLowerCase()]
        if (!data) {
            return res.status(200).json(defaultData)
        }
        return res.status(200).json(data)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            "error": {
                "code": "500",
                "message": `${e}`,
                "data": `${e}`,
                "type": "System error",
                "path": "/v1/search"
            }
        })
    }
};