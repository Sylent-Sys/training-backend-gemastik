import { Handler } from "express"
export default (allowedRole: string[]): Handler => async (req, res, next) => {
    try {
        if (!req.isAuth) return res.status(400).json({ error: "Unauthorized" })
        if (!allowedRole.map((item) => { return item.toLowerCase() }).includes(req.user.role.toLowerCase())) return res.status(400).json({ error: "Forbidden" })
        next()
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ msg: error.message })
        } else {
            return res.status(500).json({ msg: "An unexpected error occurred" })
        }
    }
}