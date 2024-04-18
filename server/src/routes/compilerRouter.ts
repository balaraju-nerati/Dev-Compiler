import express from "express";
import { deleteCode, loadCode, saveCode } from "../controllers/compilerController";
import { verifyToken } from "../middlewares/verifyToken";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyToken, saveCode);
compilerRouter.post("/load", verifyToken, loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);