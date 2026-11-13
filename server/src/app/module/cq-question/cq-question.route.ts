import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { CQQuestionValidation } from './cq-question.validation';
import { CQQuestionControllers } from './cq-question.controller';

const router = Router();

router.post(
    '/',
    validateRequest(CQQuestionValidation.createCQQuestionSchema),
    CQQuestionControllers.createCQQuestion,
);

router.get(
    '/',
    validateRequest(CQQuestionValidation.getAllCQQuestionsSchema),
    CQQuestionControllers.getAllCQQuestions,
);

router.get('/:id', CQQuestionControllers.getSingleCQQuestion);

router.patch(
    '/:id',
    validateRequest(CQQuestionValidation.updateCQQuestionSchema),
    CQQuestionControllers.updateCQQuestion,
);

router.delete('/:id', CQQuestionControllers.deleteCQQuestion);

router.post(
    '/bulk',
    validateRequest(CQQuestionValidation.bulkCreateCQQuestionSchema),
    CQQuestionControllers.createBulkCQQuestion,
);

export const CQQuestionRoutes = router;
