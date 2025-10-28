import React from "react";
import { Send } from "lucide-react";
import { MoodCheckInFormProps } from "../types";
import { MoodSlider } from "./MoodSlider";

export const MoodCheckInForm: React.FC<MoodCheckInFormProps> = ({
    feeling,
    moodScore,
    isSubmitting,
    onFeelingChange,
    onMoodScoreChange,
    onSubmit,
    errors,
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-8">
        {/* Question */}
            <div className="flex flex-col ">
                <label className="block text-xl font-semibold text-gray-800 font-Poppins mb-4">
                    How are you feeling today?
                </label>
                <textarea
                    value={feeling}
                    onChange={(e) => onFeelingChange(e.target.value)}
                    placeholder="Share what's on your mind..."
                    className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-100 focus:outline-none transition-colors resize-none font-Poppins ${errors?.feeling ? 'border-red-500' : ''}`}
                    rows={3}
                />
                {errors?.feeling && (
                    <p className="text-sm text-red-600 mt-1 font-Poppins font-normal">{errors.feeling}</p>
                )}
            </div>

            {/* Mood Slider */}
            <MoodSlider value={moodScore} onChange={onMoodScoreChange} />

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4D90FE] text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-Poppins cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                    </>
                    ) : (
                    <>
                        <Send className="w-5 h-5" />
                        <span>Submit Check-In</span>
                    </>
                )}
            </button>
        </form>
    );
};
