import { UsersService } from '../services/users.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class UsersController {
    constructor(){
        this.usersService = new UsersService();
    }
    // 사용자 정보 조회 api
    getUser = async (req, res, next) => {
        try {
            const { id } = req.user;
            const user = await this.usersService.findMe(id);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.USERS.READ_ME.SUCCEED,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
}