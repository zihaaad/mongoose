import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {User} from "../user/user.model";
import {TLoginUser} from "./auth.interface";
import {JwtPayload} from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import {createToken} from "./auth.utils";

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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Password Doesn't Match!`);
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
