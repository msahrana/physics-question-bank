import httpStatus from 'http-status';

import { CQQuestionServices } from './cq-question.service';
import { catchAsync } from '../../utils/catchAsync';
import type { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';

// ========================================
// Create CQ Question
// ========================================

const createCQQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await CQQuestionServices.createCQQuestionIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'CQ Question created successfully',
        data: result,
    });
});

// ========================================
// Get All CQ Questions
// ========================================

const getAllCQQuestions = catchAsync(async (req: Request, res: Response) => {
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

    const result = await CQQuestionServices.getAllCQQuestionsFromDB(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CQ Questions retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

// ========================================
// Get Single CQ Question
// ========================================

const getSingleCQQuestion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CQQuestionServices.getSingleCQQuestionFromDB(
        id as string,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CQ Question retrieved successfully',
        data: result,
    });
});

// ========================================
// Update CQ Question
// ========================================

const updateCQQuestion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CQQuestionServices.updateCQQuestionIntoDB(
        id as string,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CQ Question updated successfully',
        data: result,
    });
});

// ========================================
// Delete CQ Question
// ========================================

const deleteCQQuestion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await CQQuestionServices.deleteCQQuestionFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CQ Question deleted successfully',
        data: null,
    });
});

// ========================================
// Create Bulk CQ Question
// ========================================

const createBulkCQQuestion = catchAsync(async (req, res) => {
    const result = await CQQuestionServices.createBulkCQQuestionIntoDB({
        ...req.body,
        createdById: req.user?.id,
    });

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Bulk CQ Questions created successfully',
        data: result,
    });
});

// ========================================
// Export
// ========================================

export const CQQuestionControllers = {
    createCQQuestion,
    getAllCQQuestions,
    getSingleCQQuestion,
    updateCQQuestion,
    deleteCQQuestion,
    createBulkCQQuestion,
};
