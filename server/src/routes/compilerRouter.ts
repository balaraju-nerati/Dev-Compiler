import express from "express";
import { deleteCode, editCode, loadCode, saveCode } from "../controllers/compilerController";
import { verifyToken } from "../middlewares/verifyToken";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyToken, saveCode);
compilerRouter.post("/load", verifyToken, loadCode);
compilerRouter.put("/edit/:id", verifyToken, editCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);