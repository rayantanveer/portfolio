interface FeedbackButtonsProps {
    messageIndex: number;
    onFeedback: (messageIndex: number, helpful: boolean) => void;
}

function FeedbackButtons({ messageIndex, onFeedback }: FeedbackButtonsProps) {
    return null;
}

export { FeedbackButtons };
