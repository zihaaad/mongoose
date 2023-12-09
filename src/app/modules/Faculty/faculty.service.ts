import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import {AppError} from "../../errors/AppError";
import {FacultySearchableFields} from "./faculty.constant";
import {TFaculty} from "./faculty.interface";
import {Faculty} from "./faculty.model";
import mongoose from "mongoose";
import {User} from "../user/user.model";

const getAllFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFaculty = async (id: string) => {
  if (!(await Faculty.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Faculty.findOne({id}).populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty",
    },
  });
  return result;
};

const updateFaculty = async (id: string, payload: Partial<TFaculty>) => {
  if (!(await Faculty.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const {name, ...remainingFacultyData} = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (!(await Faculty.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Faculty.findOneAndUpdate({id}, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  if (!(await Faculty.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_GATEWAY, "Failed to Delete Faculty");
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed To Delete Faculty"
    );
  }
};

export const facultyServices = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
