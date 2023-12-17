import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createSemesterRegistration = catchAsync(async (req, res) => {
  // sendResponse(res, {
  //     statusCode: ,
  //     message,
  //     data:,
  // })
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  // sendResponse(res, {
  //     statusCode: ,
  //     message,
  //     data:,
  // })
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  // sendResponse(res, {
  //     statusCode: ,
  //     message,
  //     data:,
  // })
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  // sendResponse(res, {
  //     statusCode: ,
  //     message,
  //     data:,
  // })
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistrations,
  updateSemesterRegistration,
};
