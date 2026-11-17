import { Router } from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { CQQuestionValidation } from './cq-question.validation';
import { CQQuestionControllers } from './cq-question.controller';

const router = Router();

// Create CQ Question
router.post(
    '/',
    validateRequest(CQQuestionValidation.createCQQuestionSchema),
    CQQuestionControllers.createCQQuestion,
);

// Bulk Create CQ Questions
router.post(
    '/bulk',
    validateRequest(CQQuestionValidation.bulkCreateCQQuestionSchema),
    CQQuestionControllers.createBulkCQQuestion,
);

// Get All CQ Questions
router.get('/', CQQuestionControllers.getAllCQQuestions);

// Get Single CQ Question
router.get('/:id', CQQuestionControllers.getSingleCQQuestion);

// Update CQ Question
router.patch(
    '/:id',
    validateRequest(CQQuestionValidation.updateCQQuestionSchema),
    CQQuestionControllers.updateCQQuestion,
);

// Delete CQ Question
router.delete('/:id', CQQuestionControllers.deleteCQQuestion);

export const CQQuestionRoutes = router;
