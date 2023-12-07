/* eslint-disable @typescript-eslint/no-explicit-any */
import {TErrorDocs, TGenericErrorResponse} from "../interfaces/error";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;

  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorDocs: TErrorDocs = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate Error",
    errorDocs,
  };
};
