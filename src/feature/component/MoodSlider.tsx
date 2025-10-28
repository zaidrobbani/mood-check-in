import React from "react";
import { MoodSliderProps } from "../types";

// Emoji berdasarkan mood score
const getMoodEmoji = (score: number) : string => {
    if (score < 20) return "😢";
    if (score < 40) return "😔";
    if (score < 60) return "😐";
    if (score < 80) return "🙂";
    return "😄";
};

// Mood label
const getMoodLabel = (score: number) : string => {
    if (score < 20) return "Very Low";
    if (score < 40) return "Low";
    if (score < 60) return "Neutral";
    if (score < 80) return "Good";
    return "Great";
};

export const MoodSlider: React.FC<MoodSliderProps> = ({ value, onChange }) => {
    return (
        <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 font-Poppins">
                Rate your mood
            </label>

            {/* Emoji Display */}
            <div className="flex flex-col items-center space-y-4">
                <div className="text-7xl transition-all duration-300 transform hover:scale-110 font-Poppins">
                    {getMoodEmoji(value)}
                </div>
                <div className="text-xl font-medium text-gray-700 font-Poppins">
                    {getMoodLabel(value)}
                </div>
            </div>

            {/* Slider */}
            <div className="relative pt-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer mood-slider"
                    style={{
                        background: `linear-gradient(to right, #4D90FE 0%, #4D90FE ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`,
                    }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>😢 Low</span>
                    <span>😄 High</span>
                </div>
            </div>
        </div>
    );
};

export { getMoodEmoji, getMoodLabel };
