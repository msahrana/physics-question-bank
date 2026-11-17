import { Router } from 'express';

import { MCQQuestionControllers } from './mcq-question.controller';
import { MCQQuestionValidation } from './mcq-question.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = Router();

// ========================================
// 1. Bulk Create MCQ
// ========================================

router.post(
    '/bulk',
    validateRequest(MCQQuestionValidation.bulkCreateMCQQuestionSchema),
    MCQQuestionControllers.createBulkMCQQuestion,
);

// ========================================
// 2. Create Single MCQ
// ========================================

router.post(
    '/',
    validateRequest(MCQQuestionValidation.createMCQQuestionSchema),
    MCQQuestionControllers.createMCQQuestion,
);

// ========================================
// 3. Get All MCQ
// ========================================

router.get('/', MCQQuestionControllers.getAllMCQQuestions);

// ========================================
// 4. Get Single MCQ
// ========================================

router.get('/:id', MCQQuestionControllers.getSingleMCQQuestion);

// ========================================
// 5. Update MCQ
// ========================================

router.patch(
    '/:id',
    validateRequest(MCQQuestionValidation.updateMCQQuestionSchema),
    MCQQuestionControllers.updateMCQQuestion,
);

// ========================================
// 6. Delete MCQ
// ========================================

router.delete('/:id', MCQQuestionControllers.deleteMCQQuestion);

export const MCQQuestionRoutes = router;
