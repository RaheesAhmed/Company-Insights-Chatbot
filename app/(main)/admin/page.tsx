
"use client";
import React, { useEffect, useState } from 'react';
import FileViewer from "../../components/file-viewer";
import { useUser } from '@clerk/clerk-react';
import MetricsCard from "../../components/MetricsCard";

const Admin = () => {
    const { user } = useUser();
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const users = await res.json();
                setUserCount(users.length);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex min-h-screen h-full bg-brand-white">
            <div className="w-64 h-full bg-brand-dark text-white"> {/* Sidebar */}
                <ul className="mt-4 space-y-2">
                    <li><a href="#" className="block p-4 hover:bg-blue-700">Dashboard</a></li>
                    <li><a href="#" className="block p-4 hover:bg-blue-700">User Management</a></li>
                    <li><a href="#" className="block p-4 hover:bg-blue-700">Settings</a></li>
                    <li><a href="#" className="block p-4 hover:bg-blue-700">Logs</a></li>
                </ul>
            </div>
            <div className="flex-1 p-10"> {/* Main content area */}
                <div className="max-w-4xl mx-auto">
                    <p className="text-2xl font-semibold">Welcome, {user?.fullName}</p>
                    <FileViewer />
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <MetricsCard title="Total Users" value={userCount.toString()} description="Total number of users registered" />
                    </div>
                    <ul>
                        {users.map((u, index) => (
                            <li key={index}>{u.first_name} {u.last_name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admin;
