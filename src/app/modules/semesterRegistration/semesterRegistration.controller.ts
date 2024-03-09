import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {SemesterRegistrationServices} from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.createSemesterRegistration(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Semester Registration is created successfully",
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.getAllSemesterRegistrations(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Semester Registrations Retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistration(
      req.params.id
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Semester Registration is retrieved successfully",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await SemesterRegistrationServices.updateSemesterRegistration(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Semester Registration is updated successfully",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistrations,
  updateSemesterRegistration,
};
