'use client';

import {
    useSuspenseGetAllChapters,
    useSuspenseGetAllCQQuestions,
} from '@/hooks';
import CQChapterCard from './components/cq-chapter-card';

export function CQChapters() {
    // Fetch all chapters
    const { data: chapterResponse } = useSuspenseGetAllChapters();

    // Fetch all CQ questions
    const { data: cqResponse } = useSuspenseGetAllCQQuestions();

    const chapters = chapterResponse?.data ?? [];
    const questions = cqResponse?.data ?? [];

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Creative Questions</h1>

                <p className="text-muted-foreground">
                    Select a chapter to view all creative questions.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter) => {
                    const questionCount = questions.filter(
                        (question) => question.chapterId === chapter.id,
                    ).length;

                    return (
                        <CQChapterCard
                            key={chapter.id}
                            chapterId={chapter.id}
                            title={chapter.title}
                            questionCount={questionCount}
                        />
                    );
                })}
            </div>

            {chapters.length === 0 && (
                <p className="text-center text-muted-foreground">
                    No chapters found.
                </p>
            )}
        </section>
    );
}
