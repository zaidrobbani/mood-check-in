import React, { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { SuccessScreenProps } from "../types";
import { RecommendationCard } from "./RecommendationCard";
import { getMoodEmoji, getMoodLabel } from "./MoodSlider";

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
    moodScore,
    recommendation,
    onReset,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fade in animation for container
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }

        // Bounce in animation for icon
        if (iconRef.current) {
            gsap.fromTo(
                iconRef.current,
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    delay: 0.2,
                }
            );
        }
    }, []);

    return (
        <div ref={containerRef} className="space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-4">
                <div
                    ref={iconRef}
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full"
                >
                <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-Poppins">
                    Thank you for checking in!
                </h2>
                <p className="text-gray-600 font-Poppins">
                    We've recorded your mood. Here's what we recommend:
                </p>
            </div>

            {/* Recommendation Card */}
            <RecommendationCard recommendation={recommendation} />

            {/* Mood Summary */}
            <div className="bg-[#F5F6FA] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-4xl font-Poppins">{getMoodEmoji(moodScore)}</span>
                    <div>
                        <p className="text-sm text-gray-600 font-Poppins">Your mood today</p>
                        <p className="font-semibold text-gray-800 font-Poppins">
                            {getMoodLabel(moodScore)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onReset}
                    className="text-primary-100 font-medium hover:underline font-Poppins cursor-pointer"
                >
                    Check in again
                </button>
            </div>
        </div>
    );
};
