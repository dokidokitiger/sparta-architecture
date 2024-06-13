import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
    // 이력서 생성 api
    createResume = async (authorId, title, content) => {
        const createResume = await prisma.resume.create({
            data: {
                authorId,
                title,
                content,
            }
        });
        return createResume;
    }

    getResumes = async (authorId, sort) => {
        let resumeSort = sort?.toLowerCase();

        if (resumeSort !== 'desc' && resumeSort !== 'asc') {
            resumeSort = 'desc';
        }

        let data = await prisma.resume.findMany({
            where: { authorId },
            orderBy: {
                createdAt: resumeSort,
            },
            include: {
                author: true,
            },
        });
        return data;
    }

    // 이력서 상세 조회 api
    getResume = async(id, authorId) => {
        let data = await prisma.resume.findUnique({
            where: { id : parseInt(id), authorId },
            include: {author: true},
        });
        return data;
    }

    // 이력서 수정 api
    existedResume = async (id, authorId) => {
        let data = await prisma.resume.findUnique({
            where: {id: parseInt(id), authorId}
        });
        return data;
    }

    updateResume = async (id, authorId, title, content) => {
        let data = await prisma.resume.update({
            where : {id: parseInt(id), authorId},
            data: {
                ...(title && {title}),
                ...(content && {content}),
            }
        });
        return data;
    }

    // 이력서 삭제 api
    deleteResume = async (id, authorId) => {
        let data = await prisma.resume.delete({
            where: {
                id: parseInt(id), authorId
            }
        });
        return data;
    }
}