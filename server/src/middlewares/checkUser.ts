import { User } from '@/entities/user.entity';
import { AuthService } from '@/services/auth.service';
import { RequestHandler, Request } from 'express';

const userService = new AuthService();

export type RequestWithUser = Request & { user?: User };

export const checkUser: RequestHandler = async (req: RequestWithUser, res, next) => {
    try {
        const token = req.header('Authorization');
  
        if (!token) {
          return res.status(401).send({ error: { message: 'No token present' } });
        }
  
        const user = await userService.getUserByToken(token);
  
        if (!user) {
          return res.status(401).send({ error: { message: 'Wrong token' } });
        }
        req.user = user;
  
        return next(); 
    } catch (e) {
        return res.status(500).send({ error: { message: 'Internal server error' } });
    }
};