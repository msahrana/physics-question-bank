import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ChapterServices } from './chapter.service';
import type { IChapterQuery } from './chapter.interface';

// Create Chapter
const createChapter = catchAsync(async (req: Request, res: Response) => {
    const result = await ChapterServices.createChapterIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Chapter created successfully',
        data: result,
    });
});

// Get All Chapters
const getAllChapters = catchAsync(async (req: Request, res: Response) => {
    const result = await ChapterServices.getAllChaptersIntoDB(
        req.query as unknown as IChapterQuery,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Chapters retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

// Get Single Chapter
const getSingleChapter = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ChapterServices.getSingleChapterIntoDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Chapter retrieved successfully',
        data: result,
    });
});

// Update Chapter
const updateChapter = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ChapterServices.updateChapterIntoDB(
        id as string,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Chapter updated successfully',
        data: result,
    });
});

// Delete Chapter
const deleteChapter = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ChapterServices.deleteChapterIntoDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Chapter deleted successfully',
        data: result,
    });
});

export const ChapterControllers = {
    createChapter,
    getAllChapters,
    getSingleChapter,
    updateChapter,
    deleteChapter,
};
