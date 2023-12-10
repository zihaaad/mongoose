import {Schema, model} from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {type: Schema.Types.ObjectId, ref: "Course"},

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
  isDeleted: {type: Boolean, default: false},
});

courseSchema.pre("find", function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

courseSchema.pre("findOne", function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    unique: true,
  },
  faculties: [{type: Schema.Types.ObjectId, ref: "Faculty"}],
});

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
export const Course = model<TCourse>("Course", courseSchema);
