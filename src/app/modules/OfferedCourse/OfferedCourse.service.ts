import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {SemesterRegistration} from "../semesterRegistration/semesterRegistration.model";
import {TOfferedCourse} from "./OfferedCourse.interface";
import {OfferedCourse} from "./OfferedCourse.model";
import {AcademicFaculty} from "../academicFaculty/academicFaculty.model";
import {AcademicDepartment} from "../academicDepartment/academicDepartment.model";
import {Faculty} from "../Faculty/faculty.model";
import {Course} from "../Course/course.model";
import {hasTimeConflict} from "./OfferedCourse.utilities";

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistationExists = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration not found!"
    );
  }

  const academicSemester = isSemesterRegistationExists.academicSemester;

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found!");
  }

  const isAcademicDepartmentExists = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found!");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found!");
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found!");
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }

  const isSameOfferedCourseExistsWithSameResgisteredSemesterWithSameSection =
    await OfferedCourse.findOne({semesterRegistration, course, section});

  if (isSameOfferedCourseExistsWithSameResgisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with Same Section is already exists!`
    );
  }

  // get the shedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    days: {$in: {days}},
    semesterRegistration,
    faculty,
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Faculty is not available at that time ! Please Choose other time or day"
    );
  }

  const result = await OfferedCourse.create({...payload, academicSemester});
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourse,
};
