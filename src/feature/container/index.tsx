"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, Calendar, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { MoodCheckInForm, SuccessScreen } from "../component";
import { MoodStep, Recommendation } from "../types";
import { moodCheckInSchema } from "../models/formSubmittingScheme";
import { ZodError } from "zod";
import { MoodCheckInFormErrors } from "../models/formSubmittingScheme";

const MoodCheckInContainer = () => {
    const [step, setStep] = useState<MoodStep>("form");
    const [moodScore, setMoodScore] = useState(50);
    const [feeling, setFeeling] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<MoodCheckInFormErrors>({});

    useEffect(() => {
        // Fade in animation for header on mount
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, []);

    // Recommendation logic
    const getRecommendation = (score: number): Recommendation => {
        if (score < 40) {
            return {
                type: "counselor",
                title: "Talk to a Counselor",
                description:
                "We noticed you might need support. Connect with a professional counselor.",
                icon: <Calendar className="w-6 h-6" />,
                color: "bg-blue-50 border-blue-200",
                date: new Date().toISOString().split('T')[0],
            };
        }
        return {
            type: "ai",
            title: "Chat with AI Support",
            description:
                "Get instant support and coping strategies from our AI companion.",
            icon: <MessageCircle className="w-6 h-6" />,
            color: "bg-purple-50 border-purple-200",
            date: new Date().toISOString().split('T')[0]
        };
    };

    const handleSubmit = (e: React.FormEvent) => {

        // TODO handle form submission for POST request to API Integration

        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const result = moodCheckInSchema.safeParse({
            feeling,
            moodScore,
        });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
                result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                fieldErrors[fieldName] = issue.message;
            });

            setErrors(fieldErrors);
            setIsSubmitting(false);
            return;
        }

        // Simulasi loading dan submit
        setTimeout(() => {
            setIsSubmitting(false);
            setStep("success");
        }, 800);
    };

    const handleReset = () => {
        setStep("form");
        setMoodScore(50);
        setFeeling("");
    };

    const recommendation = getRecommendation(moodScore);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4 hover:bg-red-500 text-primary-100 hover:text-primary-300 transition-colors duration-300 ease-in-out"> 
                        <Heart className="w-8 h-8  " />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-Poppins">
                        Daily Mood Check-In
                    </h1>
                    <p className="text-gray-600 font-Poppins mb-2">
                        Take a moment to check in with yourself
                    </p>
                    <p className="text-gray-600 font-normal font-Poppins">{recommendation.date}</p>
                </div>

                    {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-500">
                    {step === "form" ? (
                        <MoodCheckInForm
                            feeling={feeling}
                            moodScore={moodScore}
                            isSubmitting={isSubmitting}
                            onFeelingChange={setFeeling}
                            onMoodScoreChange={setMoodScore}
                            onSubmit={handleSubmit}
                            errors={errors}
                        />
                    ) : (
                        <SuccessScreen
                            moodScore={moodScore}
                            recommendation={recommendation}
                            onReset={handleReset}
                        />
                    )}
                </div>

                    {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500 font-Poppins">
                    <p>Your emotional wellbeing matters. We're here for you. 💙</p>
                </div>
            </div>
        </div>
    );
};

export default MoodCheckInContainer;
