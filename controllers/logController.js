import { StatusCodes } from "http-status-codes";
import logService from "../services/logService.js";


export const getLogs = async (req, res) => {
    const { type } = req.query;

    const result = await logService.getLogs({ type });

    return res.status(StatusCodes.OK).json({ data: result });
};

