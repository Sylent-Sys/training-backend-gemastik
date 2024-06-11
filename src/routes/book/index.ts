import { Handler } from "express";
import authJwt from "../../middleware/authJwt.js";
import authorization from "../../middleware/authorization.js";
import BookService from "../../service/book.service.js";
type Buku = {
    id?: string;
    judul: string;
    ISBN: string;
    penulis: string;
    tahun_terbit: string;
    [key: string]: string | undefined;
};

export const get: Handler[] = [
    authJwt(),
    authorization(["user", "admin"]),
    async (_req, res) => {
        try {
            const result = await new BookService().getBooks();
            res.json({
                msg: "Book Route",
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ msg: error.message });
            } else {
                return res.status(500).json({ msg: "An unexpected error occurred" });
            }
        }
    }
];

export const post: Handler[] = [
    authJwt(),
    authorization(["admin"]),
    async (req, res) => {
        try {
            if (!req.body) {
                throw new Error("Book data is required");
            }
            const initBuku: Omit<Buku, "id"> = {
                ISBN: "",
                judul: "",
                penulis: "",
                tahun_terbit: "",
            }
            const data: Omit<Buku, "id"> = { ...initBuku, ...req.body };
            Object.keys(data).forEach((key) => {
                if (!data[key]) {
                    throw new Error(`${key} is required`);
                }
            });
            const result = await new BookService().create({ ...req.body });
            return res.json({
                msg: "Book Route",
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ msg: error.message });
            } else {
                return res.status(500).json({ msg: "An unexpected error occurred" });
            }
        }
    }
];