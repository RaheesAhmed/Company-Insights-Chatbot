
"use client";
import React, { useEffect, useState } from 'react';
import FileViewer from "../../components/file-viewer";
import { useUser } from '@clerk/clerk-react';
import MetricsCard from "../../components/MetricsCard";

const Admin = () => {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen  bg-brand-dark-light">
            <div className="w-64 min-h-screen bg-brand-black text-white flex flex-col"> {/* Sidebar */}
                <ul className="flex-grow mt-4 space-y-2">
                    <li><a href="#" className="block p-4 hover:bg-blue-700">Dashboard</a></li>

                </ul>
                <div className="mt-auto">
                    <a href="#" className="block p-4 hover:bg-blue-700">Settings</a>
                </div>
            </div>

            <div className="flex-1 p-10"> {/* Main content area */}
                <div className="max-w-4xl mx-auto">
                    <p className="text-small mb-4 text-white font-semibold">Welcome, {user?.fullName}</p>
                    <FileViewer />


                </div>
            </div>
        </div>
    );
};

export default Admin;
