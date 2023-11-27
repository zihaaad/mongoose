import {Request, Response} from "express";
import {UserServices} from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {password, student: studentData} = req.body;
    // const zodParsedData = StudentValidationSchema.parse(studentData);
    const result = await UserServices.createStudent(password, studentData);

    res.status(201).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
