import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {OfferedCourseServices} from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Offered Course is created successfully!",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourse(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Offered Course is updated successfully!",
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourse(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Offered Courses retrived successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await OfferedCourseServices.getMyOfferedCourse(
    userId,
    req.query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "My Offered Courses retrived successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getSingleOfferedCourse(
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Offered Course is retrived successfully!",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await OfferedCourseServices.deleteOfferedCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "OfferedCourse deleted successfully",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  deleteOfferedCourse,
};
