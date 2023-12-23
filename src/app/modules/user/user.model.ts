import {Schema, model} from "mongoose";
import {TUser, UserModel} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {type: String, enum: ["admin", "student", "faculty"]},
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({id});
};

UserSchema.statics.isPasswordMatched = function (
  plainTextPassword,
  hashedPassword
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", UserSchema);
