/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {NextFunction, Request, Response} from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = err.message || "Something went wrong!";

  return res.status(500).json({
    success: false,
    message,
    error: err,
  });
};
