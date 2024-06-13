import { ResumesService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
    constructor() {
        this.resumesService = new ResumesService();
    }

    // 이력서 생성 api
    createResume = async (req, res, next) => {
        try {
            const user = req.user;
            const { title, content } = req.body;
            const authorId = user.id;

            const createResume = await this.resumesService.createResume(authorId, title, content);

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.RESUMES.CREATE.SUCCEED,
                data: createResume,
            });

        } catch (error) {
            next(error)
        }
    }

    // 이력서 조회 api
    getResumes = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;

            let { sort } = req.query;

            sort = sort?.toLowerCase();

            if (sort !== 'desc' && sort !== 'asc') {
                sort = 'desc';
            }

            let data = await this.resumesService.getResumes(authorId, sort);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
                data,
            });

        } catch (error) {
            next(error);
        }
    }

    // 이력서 상세 조회 api
    getResume = async(req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;

            const {id} = req.params;

            let data = await this.resumesService.getResume(id, authorId);

            if (!data) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                  status: HTTP_STATUS.NOT_FOUND,
                  message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data,
            });

        } catch (error) {
            next(error);
        }
    }

    // 이력서 수정 api
    editResume = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id

            const {id} = req.params;

            const {title, content} = req.body;

            let existedResume = await this.resumesService.existedResume(id, authorId);

            if (!existedResume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                  status: HTTP_STATUS.NOT_FOUND,
                  message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
            
            const data = await this.resumesService.updateResume(id, authorId, title, content);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.UPDATE.SUCCEED,
                data,
            });
            
        } catch (error) {
            next(error);
        }
    }

    // 이력서 삭제 api
    deleteResume = async(req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;

            const { id } = req.params;

            let existedResume = await this.resumesService.existedResume(id, authorId);

            if (!existedResume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                  status: HTTP_STATUS.NOT_FOUND,
                  message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }

            const data = await this.resumesService.deleteResume(id, authorId);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.DELETE.SUCCEED,
                data: { id: data.id },
            });
        } catch (error) {
            next(error)
        }
    }
}