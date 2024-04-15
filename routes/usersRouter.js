import express from "express";

import { validateBody } from "../helpers/validateBody.js";
import { authenticate } from "../helpers/authenticate.js";
import { download } from "../helpers/download.js";
import {
  signinUserSchema,
  signupUserSchema,
  updateSubscriptionSchema,
  emailSchema,
} from "../schemas/usersSchemas.js";
import usersControllers from "../controllers/usersControllers.js";

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = usersControllers;

export const usersRouter = express.Router();

usersRouter.post("/register", validateBody(signupUserSchema), register);

usersRouter.post("/login", validateBody(signinUserSchema), login);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.post("/logout", authenticate, logout);

usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

usersRouter.patch(
  "/avatars",
  authenticate,
  download.single("avatar"),
  updateAvatar
);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);
