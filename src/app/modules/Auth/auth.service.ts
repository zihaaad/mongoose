import {TLoginUser} from "./auth.interface";

const loginUser = async (paload: TLoginUser) => {
  console.log(paload);
  return {};
};

export const AuthServices = {
  loginUser,
};
