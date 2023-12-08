import mongoose from "mongoose";
import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import {User} from "../user/user.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";

const getAllStudents = async (query: Record<string, unknown>) => {
  console.log("base query", query);

  const queryObj = {...query};

  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: {$regex: searchTerm, $options: "i"},
    })),
  });

  // Filtering
  const excludeFields = ["searchTerm", "sort", "limit"];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";
  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if (query?.limit) {
    limit = query.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
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
  const result = await Student.findOneAndUpdate({id}, modifiedUpdatedData, {
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
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed To Delete Student"
    );
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
