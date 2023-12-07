import {StudentServices} from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "students is retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const {studentId} = req.params;
  const result = await StudentServices.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student is retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const {studentId} = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateStudent(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const {studentId} = req.params;
  const result = await StudentServices.deleteStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
