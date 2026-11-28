import type { CQStimulusProps } from '../types';
import { extractImage, extractText } from '../utils';

const CQStimulus = ({ stimulus, photoUrl, questionNo }: CQStimulusProps) => {
    const stimulusText = extractText(stimulus);
    const stimulusImage = photoUrl || extractImage(stimulus);

    if (!stimulusText && !stimulusImage) {
        return null;
    }

    return (
        <div className="cq-stimulus">
            {stimulusText && <p className="cq-stimulus-text">{stimulusText}</p>}

            {stimulusImage && (
                <div className="cq-stimulus-image">
                    <img
                        src={stimulusImage}
                        alt={`প্রশ্ন ${questionNo} এর উদ্দীপক`}
                    />
                </div>
            )}
        </div>
    );
};

export default CQStimulus;
