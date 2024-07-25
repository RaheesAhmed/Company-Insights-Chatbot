export default function Hero() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-800">
            <div className="text-center text-white p-4 max-w-lg">
                <h1 className="text-3xl font-bold">
                    Empower Your Business with AI Insights
                </h1>
                <p className="mt-4 text-lg">
                    Unlock the full potential of your company data with our advanced AI-powered chatbot. Get real-time insights, actionable recommendations, and optimize your business strategies effortlessly.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <button className="bg-white hover:bg-gray-300 text-blue-700 font-bold py-2 px-4 rounded">
                        Get Started
                    </button>
                    <button className="bg-transparent hover:bg-white hover:text-blue-700 text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
}
