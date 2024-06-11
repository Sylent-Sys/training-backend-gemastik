import { User } from "@prisma/client";
import * as argon2 from "argon2";
import * as jose from 'jose'
import { prisma } from "../prisma.js";
export default class AuthService {
    async register({ email, password }: Omit<User, "id" | "role">) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            throw new Error("User already exists");
        }
        const hash = await argon2.hash(password);
        const result = await prisma.user.create({
            data: {
                email,
                password: hash,
            },
        });
        return result;
    }
    async login({ email, password }: Pick<User, "email" | "password">) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            throw new Error("Invalid password");
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
        const token = await new jose.SignJWT({
            email,
            role: user.role,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("2h")
            .sign(secret);
        return token;
    }
    async verifyJwt(token: string) {
        const result = await jose.jwtVerify(token, new TextEncoder().encode('secret_h3h3'), {
            algorithms: ['HS256'],
        });
        return result;
    }
}