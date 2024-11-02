import { User } from "@/entities/user.entity";
import { AuthService } from "@/services/auth.service";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

const userService = new AuthService();
export class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User);
        await userFactory.saveMany(2);
        const hashPassword = await userService.hashPassword('123');
        await userFactory.save({username: 'admin', role: 'admin', password: hashPassword});
    }
};