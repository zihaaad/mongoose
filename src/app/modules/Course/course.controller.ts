import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {courseServices} from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course created Successfully",
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourses(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Courses Retrieved Successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getSingleCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is Retrieved Successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourse(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is updated Successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await courseServices.deleteCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is Deleted Successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
