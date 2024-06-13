import {ResumesRepository} from '../repositories/resumes.repository.js';
import { authRouter } from '../routers/auth.router.js';

export class ResumesService{
    resumesRepository = new ResumesRepository();
    // 이력서 생성 api
    createResume = async (authorId, title, content) => {
        const createResume = await this.resumesRepository.createResume(authorId, title, content);
        return createResume;
    }

    // 이력서 조회 api
    getResumes = async (authorId, sort) => {

        let data = await this.resumesRepository.getResumes(authorId);

        data = data.map((resume) => {
            return {
              id: resume.id,
              authorName: resume.author.name,
              title: resume.title,
              content: resume.content,
              status: resume.status,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
            };
        });
        
        return data;
    }

    // 이력서 상세 조회 api
    getResume = async(id, authorId) => {
        let data = await this.resumesRepository.getResume(id, authorId);

        data = {
            id: data.id,
            authorName: data.author.name,
            title: data.title,
            content: data.content,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
        
        return data;
    }

    // 이력서 수정 api
    existedResume = async(id, authorId) => {
        let existedResume = await this.resumesRepository.existedResume(id, authorId);
        return existedResume;
    }

    updateResume = async(id, authorId, title, content) => {
        let updateResume = await this.resumesRepository.updateResume(id, authorId, title, content);
        return updateResume;
    }

    //이력서 삭제 api
    deleteResume = async(id, authorId) => {
        let deleteResume = await this.resumesRepository.deleteResume(id, authorId);
        return deleteResume;
    }
}