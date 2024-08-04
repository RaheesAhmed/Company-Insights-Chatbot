import React from 'react';

const SideBar = ({ onNewChat, onSelectChat, onClearAllChats, sessions, activeSessionIndex }) => {
    const getFirstFiveWords = (text) => {
        // Split the text into words and return the first 5 joined by spaces
        return text.split(/\s+/).slice(0, 5).join(' ');
    };

    const getSessionTitle = (session) => {
        if (session.messages && session.messages.length > 0) {
            // Find the first message by the assistant and use it as the title
            const assistantMessage = session.messages.find(msg => msg.role === 'assistant' && msg.text);
            if (assistantMessage) {
                const firstFiveWords = getFirstFiveWords(assistantMessage.text);
                return firstFiveWords.length > 30 ? firstFiveWords.substring(0, 30) + '...' : firstFiveWords;
            }
        }
        // If no suitable assistant message is found, use the session ID or a default title
        return session.id ? `New Chat ${session.id.split('-')[1]}` : 'New Chat';
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className="w-60 bg-black text-white flex flex-col h-full">
                <ul className="flex-grow mt-4 space-y-2 overflow-y-auto">
                    <li>
                        <button
                            onClick={onNewChat}
                            className="block p-2 bg-brand-dark-light w-40 text-center mx-auto rounded-md transition-colors duration-200"
                        >
                            New Chat
                        </button>
                    </li>
                    {sessions.map((session, index) => (
                        <li key={session.id || index}>
                            <p
                                className={`block p-2 w-full text-left px-4 cursor-pointer transition-colors duration-200
                                    ${index === activeSessionIndex
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                onClick={() => onSelectChat(index)}
                            >
                                {getSessionTitle(session)}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="p-4">
                    <button
                        onClick={onClearAllChats}
                        className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                    >
                        Clear All Chats
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
