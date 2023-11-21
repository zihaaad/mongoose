import {Schema, model} from "mongoose";
// import validator from "validator";
import {
  TGaurdian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    // required: [true, "First Name is Required"],
    // trim: true,
    // maxlength: [20, "Can't be more than 20"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  middleName: String,
  lastName: {
    type: String,
    trim: true,
    required: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    // },
    // message: "{VALUE} is not valid",
  },
});

const guardianSchema = new Schema<TGaurdian>({
  fatherName: {type: String, required: [true, "Father Name is Required"]},
  fatherOccupation: {
    type: String,
    required: [true, "Father Occuaption is Required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father ContactNo is Required"],
  },
  motherName: {type: String, required: [true, "Mother Name is Required"]},
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is Required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother ContactNo is Required"],
  },
});

const localGuardian = new Schema<TLocalGuardian>({
  name: {type: String, required: [true, "Name is Required"]},
  occupation: {type: String, required: [true, "Occuation Name is Required"]},
  contactNo: {type: String, required: [true, "ContactNo Name is Required"]},
  address: {type: String, required: [true, "Address Name is Required"]},
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
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
    required: true,
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is not a valid email type",
    // },
  },
  contactNo: {
    type: String,
    required: [true, "Contact No field is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact No field is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {type: String, required: [true, "Present field is required"]},
  permanentAddress: {
    type: String,
    required: [true, "Permanent field is required"],
  },
  guardian: {
    type: guardianSchema,
    localGuardian: {
      type: localGuardian,
      required: true,
    },
    profileImg: String,
    isActive: {
      type: String,
      enum: ["active", "blocked"],
    },
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({id});
  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
