import {Schema, model} from "mongoose";
import {Gaurdian, LocalGuardian, Student, UserName} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
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
  id: {type: String, require: true, unique: true},
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not valid",
    },
    required: [true, "Gender field is required"],
  },
  dateOfBirth: String,
  email: {type: String, required: true, unique: true},
  contactNo: {type: String, required: true},
  emergencyContactNo: {type: String, required: true},
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {type: String, required: true},
  permanentAddress: {type: String, required: true},
  guardian: {type: guardianSchema, required: true},
  localGuardian: {
    type: localGuardian,
    required: true,
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ["active", "blocked"],
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
