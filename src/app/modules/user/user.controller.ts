import {UserServices} from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import {AppError} from "../../errors/AppError";

const createStudent = catchAsync(async (req, res) => {
  const {password, student: studentData} = req.body;
  const result = await UserServices.createStudent(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student is created sucessfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const {password, faculty: facultyData} = req.body;
  const result = await UserServices.createFaculty(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const {password, admin: adminData} = req.body;
  const result = await UserServices.createAdmin(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Admin is created succesfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "Token not found!");
  }

  const result = await UserServices.getMe(token);
  const role = result?.user?.role;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `${role} is retrieved succesfully`,
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
