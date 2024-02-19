import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {AcademicDepartmentServices} from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartment(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Department is Created Successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartments(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Departments is Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const {departmentId} = req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicDepartment(
    departmentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Department is Retrieved Successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {departmentId} = req.params;
  const updatedData = req.body;
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    departmentId,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Academic Department is Updated Succesfully",
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
