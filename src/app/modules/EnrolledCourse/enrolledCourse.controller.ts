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
  updateEnrolledCourseMarks,
};
