import {TAcademicFaculty} from "./academicFaculty.interface";
import {AcademicFaculty} from "./academicFaculty.model";

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculies = async () => {
  const result = await AcademicFaculty.find();
  return result;
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
