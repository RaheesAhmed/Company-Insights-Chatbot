import React from 'react';

const data = [
    { icon: '📊', title: 'Portfolio Analysis', description: 'Generate reports on portfolio performance including total value, ROI, and sector performance.' },
    { icon: '💹', title: 'Asset Class Evaluation', description: 'Assess equities, fixed income, and alternatives performance by currency.' },
    { icon: '🛡️', title: 'Risk Management', description: 'Analyze Value-at-Risk (VaR), Expected Shortfall (ES) and conduct stress tests.' },
    { icon: '💼', title: 'Investment Advisory', description: 'Provide buy/sell/hold advice and portfolio rebalancing suggestions.' },
];

const AssistantFunctionsCard = ({ onCardClick }) => {
    return (
        <div className="flex justify-center items-center p-4 h-full">
            <div className="grid grid-cols-4 gap-4 place-items-center w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-black text-center cursor-pointer rounded-lg p-3 shadow hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full w-full"
                        onClick={() => onCardClick(item.description)}
                    >
                        <div className="text-purple-500 text-2xl">{item.icon}</div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssistantFunctionsCard;