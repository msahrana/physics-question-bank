import Link from 'next/link';

type CQChapterCardProps = {
    chapterId: string;
    title: string;
    questionCount: number;
};

const CQChapterCard = ({
    chapterId,
    title,
    questionCount,
}: CQChapterCardProps) => {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <span className="rounded-lg bg-blue-50 p-3 text-blue-600">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                    </svg>
                </span>

                <span className="text-sm text-gray-500">
                    {questionCount} Questions
                </span>
            </div>

            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {title}
            </h3>

            <Link
                href={`/courses/secondary-physics/cq/${chapterId}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                View All
                <span>→</span>
            </Link>
        </div>
    );
};

export default CQChapterCard;
