import {Schema, model} from "mongoose";
import {TCourse, TPreRequisiteCourses} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: Schema.Types.ObjectId,
  isDeleted: {type: Boolean, default: false},
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>("Course", courseSchema);
