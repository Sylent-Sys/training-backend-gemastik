import { Handler } from "express";
import authJwt from "../../middleware/authJwt.js";
import authorization from "../../middleware/authorization.js";
import BookService from "../../service/book.service.js";

export const put: Handler[] = [
    authJwt(),
    authorization(["admin"]),
    async (req, res) => {
        try {
            if (!req.params.id) {
                throw new Error("Book ID is required");
            }
            if (!req.body) {
                throw new Error("Book data is required");
            }
            const updateData = { ...req.body };
            const result = await new BookService().update(req.params.id, updateData);
            return res.json({ msg: "Book Route", data: result });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ msg: error.message });
            } else {
                return res.status(500).json({ msg: "An unexpected error occurred" });
            }
        }
    }
];

export const del: Handler[] = [
    authJwt(),
    authorization(["admin"]),
    async (req, res) => {
        try {
            if (!req.params.id) {
                throw new Error("Book ID is required");
            }
            const result = await new BookService().delete(req.params.id);
            return res.json({ msg: "Book Route", data: result });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ msg: error.message });
            } else {
                return res.status(500).json({ msg: "An unexpected error occurred" });
            }
        }
    }
];