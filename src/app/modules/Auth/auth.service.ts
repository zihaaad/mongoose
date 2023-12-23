import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {User} from "../user/user.model";
import {TLoginUser} from "./auth.interface";

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

  return {};
};

export const AuthServices = {
  loginUser,
};
