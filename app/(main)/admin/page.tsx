"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SettingsModel } from "../../components/SettingsModel";
import EditCard from "../../components/EditCard";
import FileViewer from "../../components/file-viewer";
import DashboardOverview from '@/app/components/DashboardOverview';
import UserManagement from '@/app/components/UserManagement';
import { FiHome, FiDatabase, FiUsers, FiSettings } from 'react-icons/fi';

const Admin = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('Dashboard Overview');
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => setShowSettings(!showSettings);

    const sidebarItems = [
        { name: 'Dashboard Overview', icon: FiHome },
        { name: 'Data Management', icon: FiDatabase },
        { name: 'User Management', icon: FiUsers },
        { name: 'Settings', icon: FiSettings }
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
        <div className="flex min-h-screen bg-gradient-to-br from-brand-dark-light to-brand-black">
            {/* Sidebar */}
            <div className="w-64 bg-brand-black text-white shadow-lg">
                <div className="p-6 mb-8">
                    <h1 className="text-2xl font-bold text-purple-500">Admin Panel</h1>
                </div>
                <nav>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            className={`w-full text-left p-4 flex items-center space-x-3 ${activeTab === item.name ? 'bg-purple-900 text-purple-300' : ''
                                } hover:bg-purple-800 transition-all duration-200`}
                            onClick={() => setActiveTab(item.name)}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">{activeTab}</h2>

                </div>
                <div className="bg-brand-black bg-opacity-50 rounded-lg shadow-xl p-6">
                    {renderContent()}
                </div>
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
        console.log('Uploading file:', file.name);
    };

    return (
        <div className="space-y-6">

            <div className="bg-brand-black p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">File Viewer</h3>
                <FileViewer />
            </div>
        </div>
    );
};

export default Admin;