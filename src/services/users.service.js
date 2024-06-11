import {UsersRepository} from '../repositories/users.repository.js';

export class UsersService {
    UsersRepository = new UsersRepository();

    findMe = async(id) => {
        const user = await this.UsersRepository.findMe(id);

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
    }
}