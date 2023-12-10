import QueryBuilder from "../../builder/QueryBuilder";
import {CourseSearchableFields} from "./course.constant";
import {TCourse} from "./course.interface";
import {Course} from "./course.model";

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
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const {preRequisiteCourses, ...courseRemainingData} = payload;

  await Course.findByIdAndUpdate(id, courseRemainingData, {
    new: true,
    runValidators: true,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    await Course.findByIdAndUpdate(id, {
      $pull: {preRequisiteCourses: {course: {$in: deletedPreRequisites}}},
    });

    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted
    );

    await Course.findByIdAndUpdate(id, {
      $addToSet: {preRequisiteCourses: {$each: newPreRequisites}},
    });
  }

  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );

  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {isDeleted: true},
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
};
