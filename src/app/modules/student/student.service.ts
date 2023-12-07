import mongoose from "mongoose";
import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import {User} from "../user/user.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";

const getAllStudents = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudent = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Student.findOne({id})
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Student.findOneAndUpdate({id}, payload, {new: true});
  return result;
};

const deleteStudent = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_GATEWAY, "Failed to Delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Student");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed To Delete");
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
