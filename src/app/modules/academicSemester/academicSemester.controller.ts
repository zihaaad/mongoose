import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAcademicSemster = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Semester Created",
    data: result,
  });
});

export const AcamedicSemesterControllers = {
  createAcademicSemster,
};
