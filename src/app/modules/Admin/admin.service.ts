/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import {AppError} from "../../errors/AppError";
import {AdminSearchableFields} from "./admin.constant";
import {TAdmin} from "./admin.interface";
import {Admin} from "./admin.model";
import {User} from "../user/user.model";
import mongoose from "mongoose";

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findOne({id});
  return result;
};

const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
  const {name, ...remainingAdminData} = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (!(await Admin.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }
  const result = await Admin.findOneAndUpdate({id}, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string) => {
  if (!(await Admin.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_GATEWAY, "Failed to Delete Admin");
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

export const adminServices = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
