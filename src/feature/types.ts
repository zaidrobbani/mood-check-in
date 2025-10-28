import { MoodCheckInFormErrors } from "./models/formSubmittingScheme";

export type MoodStep = "form" | "success";

export type RecommendationType = "counselor" | "ai";


export interface Recommendation {
    type: RecommendationType;
    title: string;
    description: string;
    icon: React.ReactNode;
    date: string;
    color: string;
}

export interface MoodCheckInFormProps {
    feeling: string;
    moodScore: number;
    errors?: MoodCheckInFormErrors;
    isSubmitting: boolean;
    onFeelingChange: (value: string) => void;
    onMoodScoreChange: (value: number) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export interface MoodSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export interface SuccessScreenProps {
    moodScore: number;
    recommendation: Recommendation;
    onReset: () => void;
}

export interface RecommendationCardProps {
    recommendation: Recommendation;
}
