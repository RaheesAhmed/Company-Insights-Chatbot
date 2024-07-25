import React from 'react';

const MetricsCard = ({ title, value, description }) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default MetricsCard;
