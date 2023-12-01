import {TAcademicSemester} from "./academicSemester.interface";
import {AcademicSemester} from "./academicSemester.model";

const createAcademicSemster = async (payload: TAcademicSemester) => {
  const result = AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemster,
};
