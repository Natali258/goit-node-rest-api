import express from "express";

import { validateBody } from "../helpers/validateBody.js";
import { authenticate } from "../helpers/authenticate.js";
import {
  signinUserSchema,
  signupUserSchema,
  updateSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import usersControllers from "../controllers/usersControllers.js";

const { register, login, getCurrent, logout, updateSubscription } =
  usersControllers;

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
