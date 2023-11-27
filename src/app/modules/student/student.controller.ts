import {NextFunction, Request, Response} from "express";
import {StudentServices} from "./student.service";

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
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
    res.status(200).json({
      success: true,
      message: "student is retrieved successfully",
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
    res.status(200).json({
      success: true,
      message: "student updated successfully",
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
    res.status(200).json({
      success: true,
      message: "student deleted successfully",
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
