import {NextFunction, Request, Response} from "express";
import {UserServices} from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {password, student: studentData} = req.body;
    // const zodParsedData = StudentValidationSchema.parse(studentData);
    const result = await UserServices.createStudent(password, studentData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student is created sucessfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
