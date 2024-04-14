import bcrypt from "bcrypt";

import { User } from "../users/Users.js";

export async function searchUser(filter) {
  return User.findOne(filter);
}

export async function createUser(data) {
  const salt = await bcrypt.genSalt(11);
  const hashPassword = await bcrypt.hash(data.password, salt);

  const newUser = User.create({ ...data, password: hashPassword });

  return newUser;
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

export async function validatePassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}
