import express from "express";
import { PrismaClient } from "@prisma/client";
import { createUser } from "./handlers/createUser.js";
import { loginUser } from "./handlers/loginUser.js";
import { findUnique } from "./handlers/findUnique.js";
import { checkAuth } from "./middleware/checkAuth.js";
import { deleteUser } from "./handlers/deleteUser.js";
import { updateUser } from "./handlers/updateUser.js";
import { validateUser } from "./handlers/validateUser.js";
import { resetPassword } from "./handlers/resetPassword.js";
import { updatePassword } from "./handlers/updatePassword.js";

export const userRouter = express.Router();

const prisma = new PrismaClient();

userRouter.post("/forgot-password", async (req, res) => {
  resetPassword(prisma, req, res);
});

userRouter.post("/reset-password/:token", async (req, res) => {
  updatePassword(prisma, req, res);
});

userRouter.post("/validate", async (req, res) => {
  validateUser(prisma, req, res);
});

userRouter.post("/login", (req, res) => {
  loginUser(prisma, req, res);
});

userRouter.post("/users", async (req, res) => {
  createUser(prisma, req, res);
});

userRouter.get("/users", checkAuth, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

userRouter.get("/users/:id", checkAuth, async (req, res) => {
  findUnique(prisma, req, res);
});

userRouter.put("/users/:id", checkAuth, async (req, res) => {
  updateUser(prisma, req, res);
});

userRouter.delete("/users/:id", checkAuth, async (req, res) => {
  deleteUser(prisma, req, res);
});
