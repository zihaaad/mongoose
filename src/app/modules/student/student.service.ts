import {Student} from "./student.interface";
import {StudentModel} from "./student.model";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await StudentModel.findById(id);
  return result;
};

const updateStudent = async (id: string, student: Student) => {
  const result = await StudentModel.findByIdAndUpdate(id, student, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await StudentModel.findByIdAndDelete(id);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
