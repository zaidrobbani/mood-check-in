'use client'
import React from "react";
import { RecommendationCardProps } from "../types";
import { useRouter } from "next/navigation";


export const RecommendationCard: React.FC<RecommendationCardProps> = ({
    recommendation,
}) => {
    const router = useRouter();

    const handleGetStarted = () => {
        if (recommendation.type === "counselor") {
            router.push("https://www.halodoc.com/tanya-dokter/kategori/clinical-psychologist?gad_source=1&gad_campaignid=20342747948&gbraid=0AAAAApd_cxYunACj8sETOZcfS34AKxmXk&gclid=Cj0KCQjwsPzHBhDCARIsALlWNG2xF-wFv6Y2IQwV6cu7mRbVxUPEX7hktnBHmaD3zCPFlVGgBcs8w94aAuiMEALw_wcB")
            return;
        }

        router.push("https://chatgpt.com/")
    }

    return (
        <div
            className={`border-2 ${recommendation.color} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
        >
            <div className="flex items-start space-x-4">
                <div className="shrink-0 p-3 bg-white rounded-xl shadow-sm">
                    {recommendation.icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 font-Poppins">
                        {recommendation.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    <button className={`px-6 py-2 bg-[#4D90FE] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors font-Poppins cursor-pointer ${recommendation.type === "counselor" ? 'animate-pulse' : ''}`}
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};
