import {UserServices} from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const {password, student: studentData} = req.body;
  const result = await UserServices.createStudent(
    req.file,
    password,
    studentData
  );

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
  const result = await UserServices.getMe(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `User is retrieved succesfully`,
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Status is updated succesfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
