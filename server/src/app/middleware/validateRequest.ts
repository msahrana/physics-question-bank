import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import httpStatus from 'http-status';

import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const validateRequest = <T extends ZodType>(zodSchema: T) => {
    return catchAsync((req: Request, res: Response, next: NextFunction) => {
        // Validate Request Body
        const result = zodSchema.safeParse(req.body ?? {});

        // Handle Validation Errors
        if (!result.success) {
            const errorMessages = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join(', ');

            throw new AppError(httpStatus.BAD_REQUEST, errorMessages);
        }

        // Assign Validated Data
        req.body = result.data;

        next();
    });
};
