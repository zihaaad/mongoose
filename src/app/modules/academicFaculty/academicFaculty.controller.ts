import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {academicFacultyServices} from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFaculty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Faculty is Created Successfully",
    data: result,
  });
});

const getAllAcademicFaculies = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFaculies(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Faculties Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const {facultyId} = req.params;
  const result = await academicFacultyServices.getSingleAcademicFaculty(
    facultyId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Faculty is Retrieved Successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const {facultyId} = req.params;
  const updatedData = req.body;
  const result = await academicFacultyServices.updateAcademicFaculty(
    facultyId,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Faculty is Updated Succesfully",
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculies,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
