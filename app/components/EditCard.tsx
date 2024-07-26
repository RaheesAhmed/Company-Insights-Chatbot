import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';  // Make sure to install `@heroicons/react`

const EditCard = ({ onClick }) => {
    return (
        <div className="bg-black text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Edit Settings</h2>
                    <p className="text-sm">Configure your assistant settings.</p>
                </div>
                <button onClick={onClick} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                    <PencilIcon className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    );
}

export default EditCard;
