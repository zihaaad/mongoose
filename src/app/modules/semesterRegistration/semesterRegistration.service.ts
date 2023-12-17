import httpStatus from "http-status";
import {AppError} from "../../errors/AppError";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {TSemesterRegistration} from "./semesterRegistration.interface";
import {SemesterRegistration} from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import {SemesterRegistrationStatus} from "./semesterRegistration.constant";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const {academicSemester} = payload;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        {status: SemesterRegistrationStatus.UPCOMING},
        {status: SemesterRegistrationStatus.ONGOING},
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} Semester`
    );
  }

  if (academicSemester) {
    const isAcademicSemesterExists = await AcademicSemester.findById(
      academicSemester
    );
    if (!isAcademicSemesterExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This Academic Semester not Found!"
      );
    }
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Semester is Already Register!"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrations = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};
const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester is not found!");
  }

  const currentSemesterStatus = isSemesterRegistrationExists.status;

  const requestedStatus = payload?.status;

  if (currentSemesterStatus === SemesterRegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatus.UPCOMING &&
    requestedStatus === SemesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You Can not directly Change status from ${currentSemesterStatus} TO ${requestedStatus}`
    );
  }
  if (
    currentSemesterStatus === SemesterRegistrationStatus.ONGOING &&
    requestedStatus === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You Can not Change status from ${currentSemesterStatus} TO ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
