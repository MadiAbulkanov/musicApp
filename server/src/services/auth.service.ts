import config from "@/config";
import { RegisterUserDto } from "@/dto/register-user.dto";
import { ResponseUserDto } from "@/dto/response-user.dto";
import { User } from "@/entities/user.entity";
import { IUser } from "@/interfaces/user.interface";
import { UserRepository } from "@/repositories/user.repository";
import bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";

export class AuthService {
    private repository:UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async register(registerUserDto:RegisterUserDto):Promise<IUser> {
        registerUserDto.password = await this.hashPassword(registerUserDto.password);
        const newUser = await this.repository.register(registerUserDto);
        return plainToInstance(ResponseUserDto, newUser);
    }

    async signIn(signInUserDto: RegisterUserDto): Promise<IUser> {
        const user = await this.repository.signIn(signInUserDto);
        return plainToInstance(ResponseUserDto, user);
    }

    async getUserByToken (token: string) {
        return await this.repository.getUserByToken(token);
    };

    async hashPassword (password: string) {
        const salt = await bcrypt.genSalt(config.SALT_WARK_FACTOR);
        return bcrypt.hash(password, salt);
    }

    async logOut(user: User): Promise<void> {
        this.repository.logOut(user);
    }
}