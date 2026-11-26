const prefix = '/teacher';

export const teacherRoutes = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Dashboard',
                url: prefix,
            },
        ],
    },
    {
        title: 'Academic',
        items: [
            {
                title: 'My Courses',
                url: `${prefix}/courses`,
            },
            {
                title: 'Subjects',
                url: `${prefix}/subjects`,
            },
            {
                title: 'Chapters',
                url: `${prefix}/chapters`,
            },
        ],
    },
    {
        title: 'Question Bank',
        items: [
            {
                title: 'All Questions',
                url: `${prefix}/questions`,
            },
            {
                title: 'MCQ Questions',
                url: `${prefix}/questions/mcq`,
            },
            {
                title: 'CQ Questions',
                url: `${prefix}/questions/cq`,
            },
            {
                title: 'Short Questions',
                url: `${prefix}/questions/short`,
            },
        ],
    },
    {
        title: 'Examinations',
        items: [
            {
                title: 'Exams',
                url: `${prefix}/exams`,
            },
            {
                title: 'Results',
                url: `${prefix}/results`,
            },
        ],
    },
    {
        title: 'Students',
        items: [
            {
                title: 'My Students',
                url: `${prefix}/students`,
            },
        ],
    },
    {
        title: 'Account',
        items: [
            {
                title: 'Profile',
                url: `${prefix}/profile`,
            },
        ],
    },
];
