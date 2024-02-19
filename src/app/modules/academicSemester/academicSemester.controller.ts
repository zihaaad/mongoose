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

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesters(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Semesters retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  const result = await AcademicSemesterServices.getSingleAcademicSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Semester retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  const updatedData = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    id,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Semester Updated",
    data: result,
  });
});

export const AcamedicSemesterControllers = {
  createAcademicSemster,
  updateAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
};
