import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {EnrolledCourseServices} from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await EnrolledCourseServices.createEnrolledCourse(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Enrolled Successful",
    data: result,
  });
});

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseServices.getAllEnrolledCourses(
    facultyId,
    req.query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Enrolled courses are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;
  const result = await EnrolledCourseServices.getMyEnrolledCourses(
    studentId,
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "My Enrolled Courses Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarks(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Marks is updated succesfully",
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  getAllEnrolledCourses,
  updateEnrolledCourseMarks,
};
