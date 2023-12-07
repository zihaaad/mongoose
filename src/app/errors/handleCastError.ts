import mongoose from "mongoose";
import {TErrorDocs, TGenericErrorResponse} from "../interfaces/error";

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorDocs: TErrorDocs = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorDocs,
  };
};
