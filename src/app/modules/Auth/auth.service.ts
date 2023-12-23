import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {User} from "../user/user.model";
import {TLoginUser} from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (paload: TLoginUser) => {
  const isUserExists = await User.isUserExistsByCustomId(paload.id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `${paload.id} User is not found`);
  }

  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `${paload.id} User is deleted!`);
  }

  if (isUserExists.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `${paload.id} User is blocked!`);
  }

  const isPasswordMatched = await User.isPasswordMatched(
    paload?.password,
    isUserExists?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Password Doesn't Match!`);
  }

  const jwtPayload: {userId: string; role: string} = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "7d",
  });

  return {accessToken, needsPasswordChange: isUserExists?.needsPasswordChange};
};

export const AuthServices = {
  loginUser,
};
