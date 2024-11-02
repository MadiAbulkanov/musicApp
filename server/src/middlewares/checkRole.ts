import { RequestWithUser } from "@/middlewares/checkUser";
import { NextFunction, Response } from "express";

export const checkRole = (...allowedRoles: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { user } = req;
        if (user && allowedRoles.includes(user.role)) {
            next();
            return;
        }
        res.status(403).send({ error: { message: 'permission denied' } });
    };
};