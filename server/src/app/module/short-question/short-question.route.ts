import { Router } from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { ShortQuestionValidation } from './short-question.validation';
import { ShortQuestionControllers } from './short-question.controller';

const router = Router();

// ========================================
// 1. Create Short Question
// ========================================

router.post(
    '/',
    validateRequest(ShortQuestionValidation.createShortQuestionSchema),
    ShortQuestionControllers.createShortQuestion,
);

// ========================================
// 2. Get All Short Questions
// ========================================

router.get('/', ShortQuestionControllers.getAllShortQuestions);

// ========================================
// 3. Get Single Short Question
// ========================================

router.get('/:id', ShortQuestionControllers.getSingleShortQuestion);

// ========================================
// 4. Update Short Question
// ========================================

router.patch(
    '/:id',
    validateRequest(ShortQuestionValidation.updateShortQuestionSchema),
    ShortQuestionControllers.updateShortQuestion,
);

// ========================================
// 5. Delete Short Question
// ========================================

router.delete('/:id', ShortQuestionControllers.deleteShortQuestion);

export const ShortQuestionRoutes = router;
