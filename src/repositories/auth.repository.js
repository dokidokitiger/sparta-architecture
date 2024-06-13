import {prisma} from '../utils/prisma.util.js';
import {
    HASH_SALT_ROUNDS,
  } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';

export class AuthRepository{
    findEmail = async(email) => {
        const existedUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return existedUser;
    }
    createUser = async(email, password, name) => {
        const hashedPassword = await this.hashPassword(password);
        const signedUp = await prisma.user.create({
            data: {
                email, password: hashedPassword, name,
            }
        });
        return signedUp;
    }
    hashPassword = async (password) => {
        // 비밀번호를 해시화
        const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);
        return hashedPassword;
    }
    findId = async(email) => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        const payload = {id: parseInt(user.id)};
        return payload;
    }
    findPayloadId = async(id) => {
        const user = await prisma.user.findUnique({
            where: {id},
            omit: {password: true},
        });
        return user;
    }
}