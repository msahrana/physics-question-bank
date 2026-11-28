import { CQQuestionPartsProps } from '@/types';
import { extractText, getPartLabel } from '../utils';

const CQQuestionParts = ({ parts }: CQQuestionPartsProps) => {
    if (!parts?.length) return null;

    return (
        <div className="cq-parts">
            {parts.map((part, index) => {
                const questionText = extractText(
                    part.questionText ?? part.text ?? part.content ?? part.body,
                );

                const label = getPartLabel(part, index);

                return (
                    <div key={part.id || index} className="cq-part">
                        <span className="cq-part-label">({label})</span>

                        <span className="cq-part-text">{questionText}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default CQQuestionParts;
