import {UsersService} from '../services/users.service.js';

export class UsersController {
    usersService = new UsersService();
    // 사용자 정보 조회 api
    getUser = async(req, res, next) => {
        try {
            const user = await this.usersService.findMe();

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.USERS.READ_ME.SUCCEED,
                data,
              });
        } catch (err) {
            next(err);
        }
    }
}