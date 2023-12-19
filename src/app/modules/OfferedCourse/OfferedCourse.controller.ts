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

export const OfferedCourseControllers = {
  createOfferedCourse,
};
