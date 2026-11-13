
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import httpStatus from 'http-status';
import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export const validateRequest = <T extends ZodType>(zodSchema: T) => {
    return catchAsync(
        (req: Request, res: Response, next: NextFunction) => {
            const payload = {
                body: req.body ?? {},
                query: req.query,
                params: req.params,
            };

            const result = zodSchema.safeParse(payload);

            if (!result.success) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    result.error.issues
                        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
                        .join(', '),
                );
            }

            const validatedData = result.data as {
                body?: unknown;
                query?: unknown;
                params?: unknown;
            };

            if (validatedData.body !== undefined) {
                req.body = validatedData.body;
            }

            if (validatedData.query !== undefined) {
                Object.assign(req.query, validatedData.query);
            }

            if (validatedData.params !== undefined) {
                Object.assign(req.params, validatedData.params);
            }

            next();
        },
    );
};
