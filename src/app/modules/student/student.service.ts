import {TStudent} from "./student.interface";
import {Student} from "./student.model";

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  // const result = await Student.findById(id);
  const result = await Student.aggregate([{$match: {id: id}}]);
  return result;
};

const updateStudent = async (id: string, student: TStudent) => {
  const result = await Student.updateOne({id}, student, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.updateOne({id}, {isDeleted: true});
  return result;
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
