import { appDataSource } from "@/config/dataSource";
import { RegisterUserDto } from "@/dto/register-user.dto";
import { User } from "@/entities/user.entity";
import { IUser } from "@/interfaces/user.interface";
import { Repository } from "typeorm";

export class UserRepository extends Repository<User> {
    
    constructor(){
        super(User, appDataSource.createEntityManager());
    }

    async register(registerUserDto:RegisterUserDto): Promise<IUser> {
        const newUser = this.create(registerUserDto);
        newUser.generateToken();
        return this.save(newUser);
    }

    async signIn(signInUserDto:RegisterUserDto): Promise<IUser> {
        const user = await this.findOne({
            where:{ username:signInUserDto.username },
        });
        if (!user) throw Error('invalid username or password');

        const isMatch = await user.comparePassword(signInUserDto.password);
        if (!isMatch) throw Error('invalid username or password');

        user.generateToken();

        const userWithToken: IUser = await this.save(user);
        return userWithToken;   
    }

    async getUserByToken(token: string) {
        return await this.findOneBy({ token });
    }

    async logOut(user: User) {
        user.generateToken();
        this.save(user);
    }
}