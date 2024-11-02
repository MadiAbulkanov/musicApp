import { ValidateDto } from '@/decorators/validate-dto.decorator';
import { RegisterUserDto } from '@/dto/register-user.dto';
import { IUser } from '@/interfaces/user.interface';
import { RequestWithUser } from '@/middlewares/checkUser';
import { AuthService } from '@/services/auth.service';
import { plainToInstance } from 'class-transformer';
import { Request, Response, RequestHandler } from 'express';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  @ValidateDto(RegisterUserDto)
  async register(req: Request<object, IUser, RegisterUserDto>, res: Response): Promise<void> {
    try {
      const registerUserDto = req.body;

      const user = await this.service.register(registerUserDto);

      res.send(user);
    } catch (e) {
      if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
        res.send({ error: { message: 'User already exists' } });
      } else {
        res.status(500).send({ error: { message: 'Oops something went wrong' } });
      }
    }
  };

  @ValidateDto(RegisterUserDto)
  async signIn(req: Request<object, IUser, RegisterUserDto>, res: Response): Promise<void> {
    try {
      const signInUserDto = plainToInstance(RegisterUserDto, req.body);
      const user = await this.service.signIn(signInUserDto);
      res.send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(401).send({ error: { message: e.message } });
        return;
      }
      res.status(500).send({ error: { message: 'Oops something went wrong' } });
    }
  };

  logOut: RequestHandler = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (req.user) {
        await this.service.logOut(req.user);
        res.send({message: 'success'});
        return;
      };
      res.status(404).send({error: {message: 'User not found'}});
    } catch (error) {
      res.status(500).send({error: {message: 'Internal Server error'}});
    }
  };
}
