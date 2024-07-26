import Link from 'next/link';
import './chat.module.css'


export default function Hero() {
    return (
        <div className="hero flex w-full justify-center items-center min-h-screen bg-gradient-to-r from-black to-gray-900">
            <div className="text-center text-white p-6  ">
                <h1 className="text-4xl font-extrabold mb-4">
                    Empower Your Business with AI Insights
                </h1>
                <p className="mt-2 text-lg leading-relaxed max-w-2xl">
                    Unlock the full potential of your company data with our advanced AI-powered chatbot. Get real-time insights, actionable recommendations, and optimize your business strategies effortlessly.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="bg-black hover:bg-black text-white font-bold py-2 px-6 rounded transition duration-200">
                        <Link href="/chat">Get Started</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
