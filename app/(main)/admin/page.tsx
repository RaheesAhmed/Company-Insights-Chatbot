"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SettingsModel } from "../../components/SettingsModel";
import EditCard from "../../components/EditCard";
import FileViewer from "../../components/file-viewer";
import DashboardOverview from '@/app/components/DashboardOverview';
import UserManagement from '@/app/components/UserManagement';

const Admin = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('Dashboard Overview');
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => setShowSettings(!showSettings);

    const sidebarItems = [
        'Dashboard Overview',
        'Data Management',
        'User Management',
        'Settings'
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard Overview':
                return <DashboardOverview />;
            case 'Data Management':
                return <DataManagement />;
            case 'User Management':
                return <UserManagement />
            case 'Settings':
                return showSettings ? <SettingsModel /> : <EditCard onClick={toggleSettings} />;
            default:
                return <div className="text-white">Content for {activeTab}</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-dark-light">
            {/* Sidebar */}
            <div className="w-64 bg-brand-black text-white">

                <nav>
                    {sidebarItems.map((item) => (
                        <button
                            key={item}
                            className={`w-full text-left p-4 ${activeTab === item ? 'bg-gray-700' : ''} hover:bg-gray-700`}
                            onClick={() => setActiveTab(item)}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-white">{activeTab}</h2>

                </div>
                {renderContent()}
            </div>
        </div>
    );
};



const DataManagement = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        // Implement your file upload logic here
        console.log('Uploading file:', file.name);
        // After successful upload, you might want to refresh the FileViewer
    };

    return (
        <div className="space-y-6">

            <div className="bg-brand-black p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-white">File Viewer</h3>
                <FileViewer />
            </div>
        </div>
    );
};

export default Admin;