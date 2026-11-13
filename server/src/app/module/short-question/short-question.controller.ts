import httpStatus from 'http-status';

import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ShortQuestionServices } from './short-question.service';
import { sendResponse } from '../../utils/sendResponse';

// ==========================================
// CREATE SHORT QUESTION
// ==========================================

const createShortQuestion = catchAsync(async (req: Request, res: Response) => {
    const result = await ShortQuestionServices.createShortQuestionIntoDB({
        ...req.body,
        createdById: req.user?.id,
    });

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Short question created successfully',
        data: result,
    });
});

// ==========================================
// GET ALL SHORT QUESTIONS
// ==========================================

const getAllShortQuestions = catchAsync(async (req: Request, res: Response) => {
    const result = await ShortQuestionServices.getAllShortQuestionsFromDB(
        req.query,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Short questions retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

// ==========================================
// GET SINGLE SHORT QUESTION
// ==========================================

const getSingleShortQuestion = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await ShortQuestionServices.getSingleShortQuestionFromDB(
            id as string,
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Short question retrieved successfully',
            data: result,
        });
    },
);

// ==========================================
// UPDATE SHORT QUESTION
// ==========================================

const updateShortQuestion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ShortQuestionServices.updateShortQuestionIntoDB(
        id as string,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Short question updated successfully',
        data: result,
    });
});

// ==========================================
// DELETE SHORT QUESTION
// ==========================================

const deleteShortQuestion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ShortQuestionServices.deleteShortQuestionFromDB(
        id as string,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Short question deleted successfully',
        data: result,
    });
});

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

export const ShortQuestionControllers = {
    createShortQuestion,
    getAllShortQuestions,
    getSingleShortQuestion,
    updateShortQuestion,
    deleteShortQuestion,
};
