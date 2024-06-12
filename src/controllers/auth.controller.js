import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }
    // 회원가입 api
    createUser = async (req, res, next) => {
        try {
            const { email, password, passwordConfirm, name } = req.body;
            const existedUser = await this.authService.findEmail(email);
            if (existedUser) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    status: HTTP_STATUS.CONFLICT,
                    message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
                });
            };
            const signedUp = await this.authService.createUser(
                email, password, name
            );

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
                data: signedUp
            });

            const hashedPassword = this.authService.hashPassword();

        } catch (error) {
            next(error);
        }
    }
    // 로그인 api
    loginUser = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const isPasswordMatched = await this.authService.comparePassword(email, password);
            if (!isPasswordMatched) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
                });
            }
            const payload = await this.authService.findId(email);
            const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRES_IN,
              });
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
                data: { accessToken },
              });
            
        } catch (error) {
            next(error);
        }
    }
}