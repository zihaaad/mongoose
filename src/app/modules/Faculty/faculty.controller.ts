import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {facultyServices} from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFaculties(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Faculties Retrieved Successfully",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty is Retrieved Successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const {facultyId} = req.params;
  const {faculty} = req.body;
  const result = await facultyServices.updateFaculty(facultyId, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {facultyId} = req.params;
  const result = await facultyServices.deleteFaculty(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty deleted successfully",
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
