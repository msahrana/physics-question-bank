import type { CQQuestion } from '../types';
import CQStimulus from './cq-stimulus';
import CQQuestionParts from './cq-question-parts';

type CQQuestionCardProps = {
    question: CQQuestion;
    index: number;
};

const CQQuestionCard = ({ question, index }: CQQuestionCardProps) => {
    const parts = question.question?.parts ?? [];

    return (
        <article className="cq-question-card">
            {/* Question Header */}
            <div className="cq-question-header">
                <h2 className="cq-question-number">
                    {question.questionNo || index + 1}।
                </h2>

                <span className="cq-difficulty">
                    {question.difficulty || 'MEDIUM'}
                </span>
            </div>

            {/* Stimulus */}
            <CQStimulus
                stimulus={question.question?.stimulus}
                photoUrl={question.photoUrl}
                questionNo={question.questionNo}
            />

            {/* Question Parts */}
            <CQQuestionParts parts={parts} />
        </article>
    );
};

export default CQQuestionCard;
