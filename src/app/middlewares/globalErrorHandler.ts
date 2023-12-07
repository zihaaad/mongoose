/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ErrorRequestHandler} from "express";
import {ZodError, ZodIssue} from "zod";
import {TErrorDoc} from "../interfaces/error";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  let errorDocs: TErrorDoc = [
    {
      path: "",
      message: "Something went Wrong",
    },
  ];

  const hanldeZodError = (err: ZodError) => {
    const statusCode = 400;

    const errorDocs = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });

    return {
      statusCode,
      message: "Validation Error",
      errorDocs,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = hanldeZodError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorDocs = simplifiedError?.errorDocs);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDocs,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};
