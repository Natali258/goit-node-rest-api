import jwt from "jsonwebtoken";

import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";

import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  searchUser,
  createUser,
  validatePassword,
  updateUser,
} from "../services/usersServices.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await searchUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await createUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await searchUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await validatePassword(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await updateUser({ _id: id }, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: "" });

  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await updateUser({ _id }, req.body);

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;
  const resultUpload = path.resolve(avatarsDir, filename);

  Jimp.read(resultUpload, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(path.resolve(avatarsDir, filename));
  });

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.resolve("avatars", filename);

  await updateUser(_id, { avatarURL });

  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
