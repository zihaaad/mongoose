import config from "../../config";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {TStudent} from "../student/student.interface";
import {Student} from "../student/student.model";
import {TUser} from "./user.interface";
import {User} from "./user.model";
import {generateStudentId} from "./user.utils";

const createStudent = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error("User Already Exists!");
  //   }

  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudent,
};
