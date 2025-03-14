import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: string,
  code: number,
  message: string,
  data?: any
) => {
  return res.status(code).json({
    status,
    message,
    data,
  });
};