import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {AuthServices} from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User is logged in Successfully!",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  await AuthServices.changePassword(req.user, oldPassword, newPassword);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password has been changed Successfully!",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
