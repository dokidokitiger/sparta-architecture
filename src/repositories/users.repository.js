import { Prisma } from '../utils/prisma.util.js';

export class UsersRepository{
    findMe = async() => {
        const user = await prisma.user.findUnique({
            where : {
                id: parseInt(user.id)
            }
        });
        return user;
    }
}