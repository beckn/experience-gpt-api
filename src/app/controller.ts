import { Request, Response, NextFunction } from "express";
import manaliData from "../responses/manali.json";
import himalyaData from "../responses/himalya.json";
import baseCampData from "../responses/evrestBaseCamp.json";
import defaultData from "../responses/default_response.json";
import OpenAI from "openai";
const obj: any = {
  manali: manaliData,
  himalaya: himalyaData,
  everest: baseCampData,
};
export const getLocationDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(`Recived request for ${req.body.message.searchQuery}`);
    let time: any = process.env.DELAY_TIME;
    let location: any = req.body.message.searchQuery;
    location = location.toLowerCase();
    if (!location) {
      return res.status(404).json({
        error: {
          code: "400",
          message: "Please provide correct location",
          data: "Long descriptive message",
          type: "Application error",
          path: "/v1/search",
        },
      });
    }
    let data = obj[location.toLowerCase()];
    if (!data) {
      setTimeout(() => {
        return res.status(200).json(defaultData);
      }, time);
    }
    setTimeout(() => {
      return res.status(200).json(data);
    }, time);
  } catch (e) {
    return res.status(500).json({
      error: {
        code: "500",
        message: `${e}`,
        data: `${e}`,
        type: "System error",
        path: "/v1/search",
      },
    });
  }
};
export const GptOpenAi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let location: string = req.body.message.searchQuery
      .toLowerCase()
      .toString();
    let type: string = req.body.message.prompt_type.toUpperCase().toString();
    if (location === null || location === undefined || location === " ") {
      return res.status(400).json({ Error: "Invalid Location " });
    }
    const prompt_value = process.env[type]?.replace("{LOCATION}", location);
    if (prompt_value === null || prompt_value === undefined) {
      return res.status(400).json({ Error: "Invalid prompt type" });
    }
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt_value,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let data: any = response.choices;
    data = JSON.parse(data[0].message.content);
    const key = Object.keys(data)[0];
    const items = data[key];
    const itemArray: any = [];
    data = items.map((item: any) => {
      itemArray.push(item);
    });
    return res.status(200).json({ item: itemArray });
  } catch (e) {
    return res.status(500).json({
      error: {
        code: "500",
        message: `${e}`,
        data: `${e}`,
        type: "System error",
        path: "/v2/search",
      },
    });
  }
};