const prefix = '/admin';

export const adminRoutes = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Overview',
                url: prefix,
            },
        ],
    },
    {
        title: 'Course Management',
        items: [
            {
                title: 'All Courses',
                url: `${prefix}/courses`,
            },
            {
                title: 'All Chapters',
                url: `${prefix}/chapters`,
            },
        ],
    },
    {
        title: 'Question Management',
        items: [
            {
                title: 'All MCQ Questions',
                url: `${prefix}/mcq-questions`,
            },
            {
                title: 'All CQ Questions',
                url: `${prefix}/cq-questions`,
            },
            {
                title: 'All Short Questions',
                url: `${prefix}/short-questions`,
            },
        ],
    },
    {
        title: 'User Management',
        items: [
            {
                title: 'Users',
                url: `${prefix}/users`,
            },
        ],
    },
];
