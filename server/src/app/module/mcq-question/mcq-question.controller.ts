
import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { MCQQuestionServices } from './mcq-question.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Single MCQ Question
const createMCQQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await MCQQuestionServices.createMCQQuestionIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'MCQ Question created successfully',
            data: result,
        });
    },
);

// Create Bulk MCQ Questions
const createBulkMCQQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await MCQQuestionServices.createBulkMCQQuestionIntoDB({
                ...req.body,
                createdById: req.user?.id,
            });

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'MCQ Questions created successfully',
            data: result,
        });
    },
);

// Get All MCQ Questions
const getAllMCQQuestions = catchAsync(
    async (req: Request, res: Response) => {
        const filters = {
            searchTerm: req.query.searchTerm as string,
            chapterId: req.query.chapterId as string,
            stimulusId: req.query.stimulusId as string,
            difficulty: req.query.difficulty as any,
            status: req.query.status as any,
            isPremium:
                req.query.isPremium === undefined
                    ? undefined
                    : req.query.isPremium === 'true',
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };

        const result =
            await MCQQuestionServices.getAllMCQQuestionsFromDB(filters);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'MCQ Questions retrieved successfully',
            data: result,
        });
    },
);

// Get Single MCQ Question
const getSingleMCQQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result =
            await MCQQuestionServices.getSingleMCQQuestionFromDB(id as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'MCQ Question retrieved successfully',
            data: result,
        });
    },
);

// Update MCQ Question
const updateMCQQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result =
            await MCQQuestionServices.updateMCQQuestionIntoDB(
                id as string,
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'MCQ Question updated successfully',
            data: result,
        });
    },
);

// Delete MCQ Question
const deleteMCQQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        await MCQQuestionServices.deleteMCQQuestionFromDB(id as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'MCQ Question deleted successfully',
            data: null,
        });
    },
);

export const MCQQuestionControllers = {
    createMCQQuestion,
    createBulkMCQQuestion,
    getAllMCQQuestions,
    getSingleMCQQuestion,
    updateMCQQuestion,
    deleteMCQQuestion,
};
