import React from 'react';

const SideBar = ({ onNewChat }) => {
    return (
        <>
            <div className="w-64 min-h-screen bg-brand-black text-white flex flex-col">
                <ul className="flex-grow mt-4 space-y-2">
                    <li>
                        <button onClick={onNewChat} className="block p-2 bg-brand-dark-light w-40 text-center mx-auto">
                            New Chat
                        </button>


                    </li>
                </ul>
            </div>
        </>
    );
}

export default SideBar;
