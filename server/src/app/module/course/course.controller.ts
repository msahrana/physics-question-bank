import httpStatus from 'http-status';

import { CourseServices } from './course.service';
import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

// Create Course
const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
});

// Get All Courses
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Courses retrieved successfully',
        data: result,
    });
});

// Get Single Course
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
});

// Update Course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(
        id as string,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
});

// Delete Course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course created successfully',
        data: null,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};
