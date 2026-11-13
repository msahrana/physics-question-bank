import { Router } from 'express';
import { ChapterControllers } from './chapter.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { ChapterValidations } from './chapter.validation';

const router = Router();

// Create Chapter
router.post(
    '/',
    validateRequest(ChapterValidations.createChapterValidation),
    ChapterControllers.createChapter,
);

// Get All Chapters
router.get('/', ChapterControllers.getAllChapters);

// Get Single Chapter
router.get('/:id', ChapterControllers.getSingleChapter);

// Update Chapter
router.patch(
    '/:id',
    validateRequest(ChapterValidations.updateChapterValidation),
    ChapterControllers.updateChapter,
);

// Delete Chapter
router.delete('/:id', ChapterControllers.deleteChapter);

export const ChapterRoutes = router;
