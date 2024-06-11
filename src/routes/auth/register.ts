import { Handler } from "express";
import AuthService from "../../service/auth.service.js";

export const post: Handler = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            const result = await new AuthService().register({ ...req.body });
            return res.json({
                msg: "User registered successfully",
                user: result,
            });
        } else {
            throw new Error("Email and password is required");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ msg: error.message });
        } else {
            return res.status(500).json({ msg: "An unexpected error occurred" });
        }
    }
};