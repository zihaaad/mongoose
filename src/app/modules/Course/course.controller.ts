import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {courseServices} from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course created Successfully",
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourses(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Courses Retrieved Successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getSingleCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is Retrieved Successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourse(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is updated Successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await courseServices.deleteCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Course is Deleted Successfully",
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const {faculties} = req.body;
  const result = await courseServices.assignFacultiesWithCourse(
    courseId,
    faculties
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculties Assigned to Course Successfully",
    data: result,
  });
});

const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getFacultiesWithCourse(
    req.params.courseId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculties Retireved Successfully",
    data: result,
  });
});

const removeFaculties = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const {faculties} = req.body;
  const result = await courseServices.removeFaculties(courseId, faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculties Removed from Course Successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  getFacultiesWithCourse,
  removeFaculties,
};
