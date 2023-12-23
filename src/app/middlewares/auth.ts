/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from "express";
import catchAsync from "../utils/catchAsync";
import {AppError} from "../errors/AppError";
import httpStatus from "http-status";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../config";
import {TUserRole} from "../modules/user/user.interface";
import {User} from "../modules/user/user.model";

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

    const {userId, role, iat} = decoded;

    const isUserExists = await User.isUserExistsByCustomId(userId);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, `${userId} User is not found`);
    }

    if (isUserExists.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, `${userId} User is deleted!`);
    }

    if (isUserExists.status === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, `${userId} User is blocked!`);
    }

    if (
      isUserExists.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        isUserExists.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
