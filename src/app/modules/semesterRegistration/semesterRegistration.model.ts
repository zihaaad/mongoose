import {Schema, model} from "mongoose";
import {TSemesterRegistration} from "./semesterRegistration.interface";
import {TSemesterRegistrationStatus} from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: TSemesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: 3,
    },
    minCredit: {
      type: Number,
      default: 15,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {timestamps: true}
);

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
