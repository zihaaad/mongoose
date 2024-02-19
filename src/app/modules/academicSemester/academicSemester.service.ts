import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {academicSemesterNameCodeMapper} from "./academicSemester.constant";
import {TAcademicSemester} from "./academicSemester.interface";
import {AcademicSemester} from "./academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createAcademicSemster = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid Semester Code");
  }

  const result = AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesters = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(
    AcademicSemester.find(),
    query
  );

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {meta, result};
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemester = async (
  id: string,
  updatedData: Partial<TAcademicSemester>
) => {
  const result = await AcademicSemester.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemster,
  updateAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
};
