import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {User} from "../user/user.model";
import {TLoginUser} from "./auth.interface";
import {JwtPayload} from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createToken} from "./auth.utils";
import {sendEmail} from "../../utils/sendEmail";

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

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const {userId, iat} = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `${userId} User is not found`);
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is deleted!`);
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is blocked!`);
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
  }

  const jwtPayload: {userId: string; role: string} = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {accessToken};
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `${userId} User is not found`);
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is deleted!`);
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is blocked!`);
  }

  const jwtPayload: {userId: string; role: string} = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUILink = `${config.reset_password_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (
  userId: string,
  newPassword: string,
  token: string
) => {
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `${userId} User is not found`);
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is deleted!`);
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `${userId} User is blocked!`);
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (!userId === decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access!");
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
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
  refreshToken,
  forgetPassword,
  changePassword,
  resetPassword,
};
