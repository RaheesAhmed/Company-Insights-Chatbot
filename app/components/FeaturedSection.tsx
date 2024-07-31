import React from 'react';
import { LockClosedIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/solid';

const features = [
    {
        id: 1,
        title: 'Secure Data Upload',
        description: 'Ensure your company data is securely uploaded and managed with our robust data handling capabilities',
        Icon: LockClosedIcon,
    },
    {
        id: 2,
        title: 'Intelligent Analysis',
        description: 'Leverage AI-powered analysis to gain deep insights into your company data and make informed decisions.',
        Icon: LightBulbIcon,
    },
    {
        id: 3,
        title: 'Actionable Insights',
        description: 'Receive actionable recommendations and strategies tailored to your business needs.',
        Icon: ChartBarIcon,
    }
];

const FeaturedSection = () => {
    return (
        <div className="bg-black p-10">
            <h2 className="text-brand-white text-xl font-bold mb-6 text-center">Featured Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map(feature => (
                    <div key={feature.id} className="bg-brand-dark-light p-6 text-brand-white rounded-lg text-center">
                        <feature.Icon className="h-12 w-12 mx-auto mb-4 text-brand-white" />
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="mt-2 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;
