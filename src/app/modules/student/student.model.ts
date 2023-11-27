import {Schema, model} from "mongoose";
// import validator from "validator";
import {
  TGaurdian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";

import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
  },
  middleName: String,
  lastName: {
    type: String,
    trim: true,
    required: true,
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {type: String, required: true, unique: true},
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "ID is required"],
      unique: true,
      ref: "User",
    },
    password: {type: String, required: true},
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
    presentAddress: {
      type: String,
      required: [true, "Present field is required"],
    },
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
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {virtuals: true},
  }
);

// virtual

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

// pre save middleware / hook: will work on create() save()
studentSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Query Middleware
studentSchema.pre("find", function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({id});
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
