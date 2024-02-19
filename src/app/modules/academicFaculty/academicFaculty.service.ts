import QueryBuilder from "../../builder/QueryBuilder";
import {AcademicFacultySearchableFields} from "./academicFaculty.constant";
import {TAcademicFaculty} from "./academicFaculty.interface";
import {AcademicFaculty} from "./academicFaculty.model";

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculies = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {meta, result};
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  updatedData: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFaculty,
  updateAcademicFaculty,
  getAllAcademicFaculies,
  getSingleAcademicFaculty,
};
