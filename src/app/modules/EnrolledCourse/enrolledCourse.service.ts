/* eslint-disable @typescript-eslint/no-explicit-any */
import {TEnrolledCourse} from "./enrolledCourse.interface";
import {OfferedCourse} from "../OfferedCourse/OfferedCourse.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";
import EnrolledCourse from "./enrolledCourse.model";
import {Student} from "../student/student.model";
import mongoose from "mongoose";
import {SemesterRegistration} from "../semesterRegistration/semesterRegistration.model";
import {Course} from "../Course/course.model";

const createEnrolledCourse = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  const {offeredCourse} = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "offered course not found!");
  }

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "offered course not found!");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room is Full!");
  }

  const student = await Student.findOne({id: userId}, {_id: 1});

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "student not found!");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.BAD_REQUEST, "student is already enrolled!");
  }

  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    academicSemester,
    course,
    faculty,
    maxCapacity,
  } = isOfferedCourseExists;

  const courseCredit = await Course.findById(
    isOfferedCourseExists.course
  ).select("credits -_id");

  const semesterRegistrationMaxCredit = await SemesterRegistration.findById(
    semesterRegistration
  ).select("maxCredit");

  const enrolledCourses = await EnrolledCourse.aggregate([
    {$match: {semesterRegistration, student: student._id}},
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: {$sum: "$enrolledCourseData.credits"},
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;

  if (
    totalCredits &&
    semesterRegistrationMaxCredit?.maxCredit &&
    totalCredits + courseCredit?.credits >
      semesterRegistrationMaxCredit?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded Maximun number of credits !"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          academicDepartment: academicDepartment,
          semesterRegistration: semesterRegistration,
          academicFaculty: academicFaculty,
          academicSemester: academicSemester,
          student: student._id,
          offeredCourse,
          faculty,
          course,
          isEnrolled: true,
        },
      ],
      {session}
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to enroll in this course!"
      );
    }

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourse,
};
