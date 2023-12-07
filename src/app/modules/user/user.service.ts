import mongoose from "mongoose";
import config from "../../config";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {TStudent} from "../student/student.interface";
import {Student} from "../student/student.model";
import {TUser} from "./user.interface";
import {User} from "./user.model";
import {generateStudentId} from "./user.utils";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";

const createStudent = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], {session});

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To Create User");
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([studentData], {session});
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_ACCEPTABLE, err);
  }
};

export const UserServices = {
  createStudent,
};
