import {Schema, model} from "mongoose";
import {TMonths, TAcademicSemister} from "./academicSemister.interface";

const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AcademicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: ["Autumn", "Summar", "Fall"],
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      enum: ["01", "01", "03"],
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {timestamps: true}
);

export const AcademicSemister = model<TAcademicSemister>(
  "AcademicSemister",
  AcademicSemisterSchema
);
