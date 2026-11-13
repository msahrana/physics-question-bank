import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { ChapterRoutes } from '../module/chapter/chapter.route';
import { CourseRoutes } from '../module/course/course.route';
import { MCQQuestionRoutes } from '../module/mcq-question/mcq-question.route';
import { CQQuestionRoutes } from '../module/cq-question/cq-question.route';
import { ShortQuestionRoutes } from '../module/short-question/short-question.route';

const router = Router();

const routerManger = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/course',
        route: CourseRoutes,
    },
    {
        path: '/chapter',
        route: ChapterRoutes,
    },
    {
        path: '/cq-question',
        route: CQQuestionRoutes,
    },
    {
        path: '/mcq-question',
        route: MCQQuestionRoutes,
    },
    {
        path: '/short-question',
        route: ShortQuestionRoutes,
    },
];

routerManger.forEach((r) => router.use(r.path, r.route));

export default router;
