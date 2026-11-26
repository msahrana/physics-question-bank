const prefix = '/student';

export const studentRoutes = [
    {
        title: 'Learning',
        items: [
            {
                title: 'Overview',
                url: prefix,
            },
            {
                title: 'My Courses',
                url: `${prefix}/my-courses`,
            },
            {
                title: 'My Exams',
                url: `${prefix}/my-exams`,
            },
            {
                title: 'Question Practice',
                url: `${prefix}/question-practice`,
            },
            {
                title: 'Bookmarks',
                url: `${prefix}/bookmarks`,
            },
        ],
    },

    {
        title: 'Academic',
        items: [
            {
                title: 'Results',
                url: `${prefix}/results`,
            },
            {
                title: 'Progress',
                url: `${prefix}/progress`,
            },
            {
                title: 'Study History',
                url: `${prefix}/study-history`,
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
