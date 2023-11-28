import {NextFunction, Request, Response} from "express";
import {StudentServices} from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudents();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "students are retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudent(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const student = req.body;
    const result = await StudentServices.updateStudent(id, student);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.deleteStudent(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
