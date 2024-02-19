/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import {CourseSearchableFields} from "./course.constant";
import {TCourse, TCourseFaculty} from "./course.interface";
import {Course, CourseFaculty} from "./course.model";
import {AppError} from "../../errors/AppError";
import httpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {meta, result};
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {preRequisiteCourses, ...courseRemainingData} = payload;

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {preRequisiteCourses: {course: {$in: deletedPreRequisites}}},
        },
        {new: true, runValidators: true, session}
      );

      if (!deletedPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }

      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {preRequisiteCourses: {$each: newPreRequisites}},
        },
        {new: true, runValidators: true, session}
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {isDeleted: true},
    {new: true}
  );
  return result;
};

const assignFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {course: id, $addToSet: {faculties: {$each: payload}}},
    {upsert: true, new: true}
  );
  return result;
};

const getFacultiesWithCourse = async (courseId: string) => {
  const result = await CourseFaculty.findOne({course: courseId}).populate(
    "faculties"
  );
  return result;
};

const removeFaculties = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {$pull: {faculties: {$in: payload}}},
    {new: true}
  );
  return result;
};

export const courseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  getFacultiesWithCourse,
  removeFaculties,
};
