import React, { useEffect, useState } from 'react';

export const SettingsModel = () => {
    const [assistant, setAssistant] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedInstructions, setEditedInstructions] = useState('');
    const [editedModel, setEditedModel] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/assistants');
                const data = await response.json();
                setAssistant(data);
                // Set initial values for editable fields
                setEditedName(data.name);
                setEditedInstructions(data.instructions);
                setEditedModel(data.model);
            } catch (error) {
                console.error('Failed to fetch assistant data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the changes
        console.log('Saving:', editedName, editedInstructions, editedModel);
        setAssistant({
            ...assistant,
            name: editedName,
            instructions: editedInstructions,
            model: editedModel,
        });
        setEditMode(false);
    };

    if (!assistant) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow">
                {editMode ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                                Model
                            </label>
                            <input
                                type="text"
                                id="model"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={editedModel}
                                onChange={(e) => setEditedModel(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
                                Instructions
                            </label>
                            <textarea
                                id="instructions"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={editedInstructions}
                                onChange={(e) => setEditedInstructions(e.target.value)}
                                rows="4"
                            />
                        </div>
                        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-bold">{assistant.name}</h1>
                        <p className="text-gray-700"><strong>Model:</strong> {assistant.model}</p>
                        <div>
                            <h2 className="text-lg font-semibold mt-4 mb-2">Instructions:</h2>
                            <div className="bg-gray-200 p-3 rounded">
                                {assistant.instructions ? <pre className="whitespace-pre-wrap">{assistant.instructions}</pre> : <p>No instructions provided.</p>}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mt-4">Tools:</h2>
                            <ul className="list-disc pl-5">
                                {assistant.tools.map((tool, index) => (
                                    <li key={index} className="text-gray-700">{tool.type}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={handleEditToggle} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}


