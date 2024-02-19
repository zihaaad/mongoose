import QueryBuilder from "../../builder/QueryBuilder";
import {AcademicDepartmentSearchableFields} from "./academicDepartment.constant";
import {TAcademicDepartment} from "./academicDepartment.interface";
import {AcademicDepartment} from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartments = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate("academicFaculty"),
    query
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {meta, result};
};

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  updatedData: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
};
