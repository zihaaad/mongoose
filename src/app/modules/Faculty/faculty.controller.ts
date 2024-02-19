import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {facultyServices} from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFaculties(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Faculties Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty is Retrieved Successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const {id} = req.params;
  const {faculty} = req.body;
  const result = await facultyServices.updateFaculty(id, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Faculty updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await facultyServices.deleteFaculty(id);
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
