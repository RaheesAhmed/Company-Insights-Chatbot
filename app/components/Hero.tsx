import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaRobot, FaChartLine, FaLightbulb } from 'react-icons/fa';

const FeatureItem = ({ icon, text }) => (
    <div className="flex items-center space-x-2 text-gray-300">
        {icon}
        <span>{text}</span>
    </div>
);


export default function Hero() {
    return (
        <div className="hero relative flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 text-center text-white p-6 max-w-4xl mt-16">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                    Revolutionize Your Business with
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <h1  >AI-Powered Insights</h1>
                    </span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-300 mb-8">
                    Harness the power of advanced AI to transform your company data into strategic advantages. Our intelligent assistant delivers real-time insights, actionable recommendations, and optimized business strategies at your fingertips.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                    <FeatureItem icon={<FaRobot className="text-purple-400" />} text="AI-Powered Analysis" />
                    <FeatureItem icon={<FaChartLine className="text-purple-400" />} text="Real-Time Insights" />
                    <FeatureItem icon={<FaLightbulb className="text-purple-400" />} text="Smart Recommendations" />
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/chat">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}