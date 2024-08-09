import React from 'react';
import { LockClosedIcon, LightBulbIcon, ChartBarIcon, CogIcon, CloudUploadIcon, ShieldCheckIcon } from '@heroicons/react/solid';

const features = [
    {
        id: 1,
        title: 'Secure Data Upload',
        description: 'Ensure your company data is securely uploaded and managed with our robust data handling capabilities',
        Icon: LockClosedIcon,
        color: 'from-purple-400 to-pink-500',
    },
    {
        id: 2,
        title: 'Intelligent Analysis',
        description: 'Leverage AI-powered analysis to gain deep insights into your company data and make informed decisions.',
        Icon: LightBulbIcon,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        id: 3,
        title: 'Actionable Insights',
        description: 'Receive actionable recommendations and strategies tailored to your business needs.',
        Icon: ChartBarIcon,
        color: 'from-green-400 to-emerald-500',
    },
    {
        id: 4,
        title: 'Automated Processing',
        description: 'Streamline your workflow with our automated data processing and report generation.',
        Icon: CogIcon,
        color: 'from-yellow-400 to-orange-500',
    },
    {
        id: 5,
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with your existing cloud infrastructure for efficient data management.',
        Icon: CloudUploadIcon,
        color: 'from-indigo-400 to-purple-500',
    },
    {
        id: 6,
        title: 'Advanced Security',
        description: 'Protect your sensitive information with our state-of-the-art security measures and encryption.',
        Icon: ShieldCheckIcon,
        color: 'from-red-400 to-pink-500',
    }
];

const FeatureCard = ({ feature }) => (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
        <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6`}>
            <feature.Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
    </div>
);

const FeaturedSection = () => {
    return (
        <section className="bg-gradient-to-br from-gray-900 to-black py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12">
                    Empower Your Business with AI
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {features.map(feature => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
                <div className="text-center mt-16">
                    <a
                        href="#"
                        className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Get Started Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;