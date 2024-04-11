"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            dbName: "Dev-Compiler",
        });
        console.log("Database connection successfull");
    }
    catch (error) {
        console.log("Error connecting Database", error);
    }
};
exports.dbConnect = dbConnect;
