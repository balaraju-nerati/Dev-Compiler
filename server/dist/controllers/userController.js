"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await User_1.User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        return res.status(201).send({ user });
    }
    catch (error) {
        return res.status(500).send({ messaga: "Error signing up!", error: error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User_1.User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).send({ message: "User not found" });
        }
        const passwordMatched = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatched) {
            return res.status(400).send({ message: "wrong Password!" });
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
            email: existingUser.email,
        }, process.env.JWT_KEY, {
            expiresIn: "1d",
        });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).send({ existingUser, jwtToken });
    }
    catch (error) {
        return res.status(500).send({ messaga: "Error Log in!", error: error });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({ messaga: "Logged out successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .send({ messaga: "Error Logging out!", error: error });
    }
};
exports.logout = logout;
