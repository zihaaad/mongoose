/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ErrorRequestHandler} from "express";
import {ZodError} from "zod";
import {TErrorDocs} from "../interfaces/error";
import config from "../config";
import {hanldeZodError} from "../errors/handleZodError";
import {handleValidationError} from "../errors/handleValidationError";
import {handleCastError} from "../errors/handleCastError";
import {handleDuplicateError} from "../errors/handleDuplicateError";
import {AppError} from "../errors/AppError";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  let errorDocs: TErrorDocs = [
    {
      path: "",
      message: "Something went Wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = hanldeZodError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorDocs = simplifiedError?.errorDocs);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorDocs = simplifiedError?.errorDocs);
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorDocs = simplifiedError?.errorDocs);
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorDocs = simplifiedError?.errorDocs);
  } else if (err instanceof JsonWebTokenError || TokenExpiredError) {
    statusCode = 401;
    message = "Unauthorized Access";
  } else if (err instanceof AppError) {
    (statusCode = err?.statusCode),
      (message = err?.message),
      (errorDocs = [
        {
          path: "",
          message: err?.message,
        },
      ]);
  } else if (err instanceof Error) {
    (message = err?.message),
      (errorDocs = [
        {
          path: "",
          message: err?.message,
        },
      ]);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDocs,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};
