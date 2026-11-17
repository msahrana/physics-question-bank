import { Router } from 'express';

import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = Router();

// Create Course
router.post(
    '/',
    validateRequest(CourseValidations.createCourseValidation),
    CourseControllers.createCourse,
);

// Get All Courses
router.get('/', CourseControllers.getAllCourses);

// Get Single Course
router.get('/:id', CourseControllers.getSingleCourse);

// Update Course
router.patch(
    '/:id',
    validateRequest(CourseValidations.updateCourseValidation),
    CourseControllers.updateCourse,
);

// Delete Course
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
