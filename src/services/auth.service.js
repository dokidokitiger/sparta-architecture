import jwt from 'jsonwebtoken';
import {AuthRepository} from '../repositories/auth.repository.js';
import {
    HASH_SALT_ROUNDS,
  } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';

export class AuthService{
    AuthRepository = new AuthRepository();

    findEmail = async(email) => {
        const existedUser = this.AuthRepository.findEmail(email);
        return existedUser;
    }

    createUser = async(email, password, name) => {
        const signedUp = await this.AuthRepository.createUser(email, password, name);
        return {
            id: signedUp.id,
            email: signedUp.email,
            name: signedUp.name,
        }
    }

    hashPassword = async() => {
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    }

    findId = async(email) => {
        const payload = this.AuthRepository.findId(email);
        return payload;
    }

    comparePassword = async(email, password) => {
        const user = await this.AuthRepository.findEmail(email);
        const isPasswordMatched = 
        user && bcrypt.compareSync(password, user.password);
        return isPasswordMatched;
    }

    // jsonwebToken = async(payload, ACCESS_TOKEN_SECRET, {
    //     expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    //   }) => {
    //     const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    //         expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    //       });
      
    // }

}
