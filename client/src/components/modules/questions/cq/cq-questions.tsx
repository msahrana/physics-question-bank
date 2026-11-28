'use client';

import { useSuspenseGetAllCQQuestions } from '@/hooks';
import type { CQQuestion } from './types';
import CQQuestionCard from './components/cq-question-card';
import './cq-questions.css';

type CQQuestionsProps = {
    chapterId: string;
};

const CQQuestions = ({ chapterId }: CQQuestionsProps) => {
    const { data } = useSuspenseGetAllCQQuestions();

    const allQuestions: CQQuestion[] = data?.data ?? [];

    const cqQuestions = allQuestions.filter(
        (question) => question.chapter?.id === chapterId,
    );

    const chapterTitle = cqQuestions[0]?.chapter?.title ?? 'সৃজনশীল প্রশ্ন';

    if (!cqQuestions.length) {
        return (
            <div className="cq-empty">এই অধ্যায়ে কোনো প্রশ্ন পাওয়া যায়নি।</div>
        );
    }

    return (
        <main className="cq-container">
            <header className="cq-header">
                <h1>অধ্যায় : {chapterTitle}</h1>
                <div className="cq-header-line" />
                <p>{cqQuestions.length} টি সৃজনশীল প্রশ্ন</p>
            </header>

            <section className="cq-list">
                {cqQuestions.map((question, index) => (
                    <CQQuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                    />
                ))}
            </section>
        </main>
    );
};

export default CQQuestions;
