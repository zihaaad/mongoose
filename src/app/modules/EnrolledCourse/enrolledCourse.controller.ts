import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {EnrolledCourseServices} from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourse();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Enrolled Successful",
    data: result,
  });
});
export const EnrolledCourseControllers = {
  createEnrolledCourse,
};
