import {ZodError, ZodIssue} from "zod";
import {TGenericErrorResponse} from "../interfaces/error";

export const hanldeZodError = (err: ZodError): TGenericErrorResponse => {
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
