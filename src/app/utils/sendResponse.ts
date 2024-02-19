import {Response} from "express";

type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    message: data?.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
