import bcrypt from "bcrypt";
import gravatar from "gravatar";

import { User } from "../users/Users.js";
import { nanoid } from "nanoid";

export const searchUser = (filter) => {
  return User.findOne(filter);
};

export const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 5);
  const avatarURL = gravatar.url(data.email);
  const verificationToken = nanoid();

  const newUser = User.create({
    ...data,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  return newUser;
};

export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

export const validatePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
