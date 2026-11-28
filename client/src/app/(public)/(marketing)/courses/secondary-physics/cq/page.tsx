import { Suspense } from 'react';

import { CQChapters } from '@/components/modules/questions/cq/cq-chapters';

const skeletonItems = [
    'skeleton-1',
    'skeleton-2',
    'skeleton-3',
    'skeleton-4',
    'skeleton-5',
    'skeleton-6',
];

function CQChaptersSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skeletonItems.map((item) => (
                <div
                    key={item}
                    className="h-44 animate-pulse rounded-xl border bg-gray-100"
                />
            ))}
        </div>
    );
}

export default function CQPage() {
    return (
        <Suspense fallback={<CQChaptersSkeleton />}>
            <CQChapters />
        </Suspense>
    );
}
