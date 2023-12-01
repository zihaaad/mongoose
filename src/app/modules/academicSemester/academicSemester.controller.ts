import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {AcademicSemesterServices} from "./academicSemester.service";

const createAcademicSemster = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemster(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Semester is created successfully",
    data: result,
  });
});

export const AcamedicSemesterControllers = {
  createAcademicSemster,
};
