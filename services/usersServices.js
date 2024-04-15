import bcrypt from "bcrypt";
import gravatar from "gravatar";

import { User } from "../users/Users.js";

export const searchUser = (filter) => {
  return User.findOne(filter);
};

export const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, salt);
  const avatarURL = gravatar.url(data.email);

  const newUser = User.create({ ...data, password: hashPassword, avatarURL });

  return newUser;
};

export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

export const validatePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
