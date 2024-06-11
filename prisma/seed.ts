import { PrismaClient } from '@prisma/client'
import * as argon2 from "argon2";
async function init() {
    const prisma = new PrismaClient()
    await prisma.buku.deleteMany()
    await prisma.user.deleteMany()
    await prisma.user.create({
        data: {
            email: 'user@user.com',
            password: await argon2.hash('user'),
            role: 'user',
        },
    })
    await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            password: await argon2.hash('admin'),
            role: 'admin',
        },
    })
    await prisma.buku.create({
        data: {
            judul: 'Buku 1',
            ISBN: '1234567890',
            penulis: 'Penulis 1',
            tahun_terbit: '2021',
        },
    })
    await prisma.$disconnect()
}
init()