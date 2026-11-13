import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ChapterServices } from './chapter.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createChapter = catchAsync(async (req: Request, res: Response) => {
    const result = await ChapterServices.createChapterIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Chapter created successfully',
        data: result,
    });
});

const getAllChapters = catchAsync(async (req: Request, res: Response) => {});

const getSingleChapter = catchAsync(async (req: Request, res: Response) => {});

const updateChapter = catchAsync(async (req: Request, res: Response) => {});

const deleteChapter = catchAsync(async (req: Request, res: Response) => {});

export const ChapterControllers = {
    createChapter,
    getAllChapters,
    getSingleChapter,
    updateChapter,
    deleteChapter,
};
