import mongoose from "mongoose";
import {TStudent} from "./student.interface";
import {Student} from "./student.model";
import {User} from "../user/user.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import {studentSearchableFields} from "./student.constant";

const getAllStudents = async (query: Record<string, unknown>) => {
  // const queryObj = {...query};

  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // // Filtering
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });

  // let sort = "-createdAt";
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting
  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(Student.find(), query)
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
