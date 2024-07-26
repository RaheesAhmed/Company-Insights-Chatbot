"use client";
import React, { useState } from 'react';
import FileViewer from "../../components/file-viewer";
import { useUser } from '@clerk/clerk-react';
import MetricsCard from "../../components/MetricsCard";
import { SettingsModel } from "../../components/SettingsModel";
import EditCard from "../../components/EditCard";

const Admin = () => {
    const { user } = useUser();
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => setShowSettings(!showSettings);

    return (
        <div className="flex min-h-screen bg-brand-dark-light">
            <div className="w-64 min-h-screen bg-brand-black text-white flex flex-col"> {/* Sidebar */}
                <ul className="flex-grow mt-4 space-y-2">
                    <li><a href="#" className="block p-4 text-white shadow-lg hover:bg-gray-700 rounded-md">Dashboard</a></li>
                </ul>
                {/* <div className="mt-auto">
                    <button onClick={toggleSettings} className="block p-4 hover:bg-blue-700">Settings</button>
                </div> */}
            </div>

            <div className="flex-1 p-10"> {/* Main content area */}
                <div className="max-w-4xl mx-auto">
                    <p className="text-small mb-4 text-white font-semibold">Welcome, {user?.fullName}</p>
                    <EditCard onClick={toggleSettings} />
                    {showSettings ? <SettingsModel /> : <FileViewer />}
                </div>
            </div>
        </div>
    );
};


export default Admin;

