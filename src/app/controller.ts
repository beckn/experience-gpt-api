import { Request, Response, NextFunction } from "express";
import manaliData from '../responses/manali.json'
import himalyaData from '../responses/himalya.json'
import baseCampData from '../responses/evrestBaseCamp.json'
import defaultData from "../responses/default_response.json";
import { Configuration, OpenAIApi } from 'openai'

const obj: any = { "manali": manaliData, "himalaya": himalyaData, "everest": baseCampData }




export const getLocationDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`Recived request for ${req.body.message.searchQuery}`)
        let time: any = process.env.DELAY_TIME
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
            setTimeout(() => {
                return res.status(200).json(defaultData)
            }, time)
        }
        setTimeout(() => {
            return res.status(200).json(data)
        }, time)

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

export const GptOpenAi = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let location: string = req.body.message.searchQuery.toLowerCase().toString()
        let type: string=req.body.message.prompt_type.toUpperCase().toString()
        if((location===null)||(location===undefined)||(location===" "))
        {
            return res.status(400).json({Error:"Invalid Location "})
        }

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          
        });
        const openai = new OpenAIApi(configuration);
        const prompt_value=process.env[type]?.replace('{LOCATION}',location)
        if((prompt_value===null)||(prompt_value===undefined))
        {
            return res.status(400).json({Error:"Invalid prompt type"})
        }
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt_value,
            max_tokens: 512,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0,
            presence_penalty: 0,
           
        });
        
        let data: any = completion?.data?.choices[0]?.text
        data = JSON.parse(data)
        const itemArray: any = []
        data = data.map((item: any) => {
            itemArray.push(item.item)
        })
        return res.status(200).json({ item: itemArray })
    } catch (e) {
        return res.status(500).json({
            "error": {
                "code": "500",
                "message": `${e}`,
                "data": `${e}`,
                "type": "System error",
                "path": "/v2/search"
            }
        })
    }

}
