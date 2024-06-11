import {UsersRepository} from '../repositories/users.repository.js';

export class UsersService {
    UsersRepository = new UsersRepository();

    findMe = async() => {
        const user = await this.UsersRepository.findMe();

        return user.map((user)=> {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    }
}