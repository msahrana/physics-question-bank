import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { ShortQuestionValidation } from './short-question.validation';
import { ShortQuestionControllers } from './short-question.controller';

const router = Router();

// Create
router.post(
    '/',
    validateRequest(ShortQuestionValidation.createShortQuestionSchema),
    ShortQuestionControllers.createShortQuestion,
);

// Get all
router.get(
    '/',
    validateRequest(ShortQuestionValidation.getAllShortQuestionsSchema),
    ShortQuestionControllers.getAllShortQuestions,
);

// Get single
router.get('/:id', ShortQuestionControllers.getSingleShortQuestion);

// Update
router.patch(
    '/:id',
    validateRequest(ShortQuestionValidation.updateShortQuestionSchema),
    ShortQuestionControllers.updateShortQuestion,
);

// Delete
router.delete('/:id', ShortQuestionControllers.deleteShortQuestion);

export const ShortQuestionRoutes = router;
