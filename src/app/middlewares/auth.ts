/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from "express";
import catchAsync from "../utils/catchAsync";
import {AppError} from "../errors/AppError";
import httpStatus from "http-status";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../config";
import {TUserRole} from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You Are not Authorized!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
