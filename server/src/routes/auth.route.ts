import { AuthController } from '@/controllers/auth.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkUser } from '@/middlewares/checkUser';
import { Router } from 'express';

export class AuthRoute implements Route {
  public path = '/users';
  public router = Router();

  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
    this.init();
  }

  private init() {
    this.router.post('/', this.controller.register);
    this.router.post('/sessions', this.controller.signIn);
    this.router.delete('/logout', checkUser, this.controller.logOut);
  }
}
