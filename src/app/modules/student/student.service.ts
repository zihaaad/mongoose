/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import {User} from "../user/user.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import {studentSearchableFields} from "./student.constant";

const getAllStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("user")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudent = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Student.findById(id)
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
  const {name, guardian, localGuardian, ...remainingStudentData} = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_GATEWAY, "Failed to Delete student");
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Student");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
