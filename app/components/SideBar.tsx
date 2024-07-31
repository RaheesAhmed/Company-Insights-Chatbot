import React from 'react';

const SideBar = ({ onNewChat }: { onNewChat: any }) => {
    return (
        <div className='flex flex-col'>
            <div className="w-60 min-h-screen bg-brand-black text-white flex flex-col">
                <ul className="flex-grow mt-4 space-y-2">
                    <li>
                        <button onClick={onNewChat} className="block p-2 bg-brand-dark-light w-40 text-center mx-auto rounded-md">
                            New Chat
                        </button>

                    </li>

                    <li >
                        <p className="block p-2  w-40  text-left px-4">
                            user chat one
                        </p>
                        <p className="block p-2  w-40 text-left px-4">
                            user chat two
                        </p>
                        <p className="block p-2  w-40 text-left px-4">
                            user chat three
                        </p>

                    </li>


                </ul>
            </div>

        </div>
    );
}

export default SideBar;