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
  deleteCourse,
};
