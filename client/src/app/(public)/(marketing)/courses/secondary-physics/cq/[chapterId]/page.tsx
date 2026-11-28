import { Suspense } from 'react';
import CQQuestions from '@/components/modules/questions/cq/cq-questions';

type PageProps = {
    params: Promise<{
        chapterId: string;
    }>;
};

function CQQuestionsSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((item) => (
                <div
                    key={`cq-skeleton-${item}`}
                    className="h-48 animate-pulse rounded-xl border bg-gray-100"
                />
            ))}
        </div>
    );
}

async function CQChapterContent({ params }: PageProps) {
    const { chapterId } = await params;

    return <CQQuestions chapterId={chapterId} />;
}

export default function CQChapterPage({ params }: PageProps) {
    return (
        <Suspense fallback={<CQQuestionsSkeleton />}>
            <CQChapterContent params={params} />
        </Suspense>
    );
}
