import { Buku } from "@prisma/client";
import { prisma } from "../prisma.js";

export default class BookService {
    async getBooks() {
        return await prisma.buku.findMany()
    }
    async update(id: string, data: Omit<Buku, "id">) {
        const checkIfExist = await prisma.buku.findUnique({
            where: {
                id
            }
        })
        if (!checkIfExist) {
            throw new Error("Book not found")
        }
        return await prisma.buku.update({
            where: {
                id
            },
            data: {
                ...data
            }
        })
    }
    async delete(id: string) {
        const checkIfExist = await prisma.buku.findUnique({
            where: {
                id
            }
        })
        if (!checkIfExist) {
            throw new Error("Book not found")
        }
        return await prisma.buku.delete({
            where: {
                id
            }
        })
    }
    async create(data: Omit<Buku, "id">) {
        return await prisma.buku.create({
            data: {
                ...data
            }
        })
    }
}