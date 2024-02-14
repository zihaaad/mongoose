import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {AuthServices} from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const {refreshToken, accessToken, needsPasswordChange} = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User is logged in Successfully!",
    data: {accessToken, needsPasswordChange},
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

const refreshToken = catchAsync(async (req, res) => {
  const {refreshToken} = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Access Token is retrieved successfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Reset Link is Generated successfully!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const {id, newPassword} = req.body;
  await AuthServices.resetPassword(
    id,
    newPassword,
    req.headers.authorization as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password reset successful!",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
