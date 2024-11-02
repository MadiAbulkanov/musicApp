import { User } from '@/entities/user.entity';
import { AuthService } from '@/services/auth.service';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, async (faker) => {
    const userService = new AuthService();
    const user = new User();
    user.username = faker.internet.userName();
    user.password = await userService.hashPassword('password');
    user.generateToken();
    return user;
});