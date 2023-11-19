import {Schema, model} from "mongoose";
import {Gaurdian, LocalGuardian, Student, UserName} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Gaurdian>({
  fatherName: {type: String, required: true},
  fatherOccupation: {type: String, required: true},
  fatherContactNo: {type: String, required: true},
  motherName: {type: String, required: true},
  motherOccupation: {type: String, required: true},
  motherContactNo: {type: String, required: true},
});

const localGuardian = new Schema<LocalGuardian>({
  name: {type: String, required: true},
  occupation: {type: String, required: true},
  contactNo: {type: String, required: true},
  address: {type: String, required: true},
});

const studentSchema = new Schema<Student>({
  id: String,
  name: userNameSchema,
  gender: ["male", "female"],
  dateOfBirth: String,
  email: {type: String, required: true},
  contactNo: {type: String, required: true},
  emergencyContactNo: {type: String, required: true},
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: {type: String, required: true},
  permanentAddress: {type: String, required: true},
  guardian: guardianSchema,
  localGuardian: localGuardian,
  profileImg: String,
  isActive: ["active", "blocked"],
});

const Student = model<Student>("Student", studentSchema);
