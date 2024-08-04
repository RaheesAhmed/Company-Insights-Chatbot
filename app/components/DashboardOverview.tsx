import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardOverview = () => {
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        signUps: 0,
        signIns: 0,
        recentSignUps: [],
        recentSignIns: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users');
                const users = response.data.users.data;
                processUserData(users);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const processUserData = (users) => {
        const totalUsers = users.length;
        const recentSignUps = users.sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
        const recentSignIns = users.sort((a, b) => b.lastSignInAt - a.lastSignInAt).slice(0, 6);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const activeUsers = users.filter(user => new Date(user.lastActiveAt).getMonth() === currentMonth && new Date(user.lastActiveAt).getFullYear() === currentYear).length;
        const signUps = users.filter(user => new Date(user.createdAt).getMonth() === currentMonth && new Date(user.createdAt).getFullYear() === currentYear).length;
        const signIns = users.filter(user => new Date(user.lastSignInAt).getMonth() === currentMonth && new Date(user.lastSignInAt).getFullYear() === currentYear).length;

        setDashboardData({
            totalUsers,
            activeUsers,
            signUps,
            signIns,
            recentSignUps,
            recentSignIns
        });
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 items-center justify-center">
            {/* Statistics Tiles */}
            <div className="bg-black text-white p-4 rounded-md flex flex-col items-center justify-center">
                <h4 className="text-xl font-semibold">Total Users</h4>
                <p className="text-3xl">{dashboardData.totalUsers}</p>
            </div>
            <div className="bg-black text-white p-4 rounded-md flex flex-col items-center justify-center">
                <h4 className="text-xl font-semibold">Active Users</h4>
                <p className="text-3xl">{dashboardData.activeUsers}</p>
            </div>
            <div className="bg-black text-white p-4 rounded-md flex flex-col items-center justify-center">
                <h4 className="text-xl font-semibold">Sign-ups</h4>
                <p className="text-3xl">{dashboardData.signUps}</p>
            </div>
            <div className="bg-black text-white p-4 rounded-md flex flex-col items-center justify-center">
                <h4 className="text-xl font-semibold">Sign-ins</h4>
                <p className="text-3xl">{dashboardData.signIns}</p>
            </div>

            {/* Recent Sign-ups */}
            <div className="col-span-4 bg-black text-white p-4 rounded-md">
                <h4 className="text-xl font-semibold mb-2">Recent Sign-ups</h4>
                {dashboardData.recentSignUps.map(user => (
                    <div key={user.id} className="flex items-center space-x-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white uppercase">
                            {user.firstName[0]}
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-400">{user.emailAddresses[0].emailAddress}</p>
                        </div>
                        <p className="text-sm">{formatDate(user.createdAt)}</p>
                    </div>
                ))}
            </div>

            {/* Recent Sign-ins */}
            <div className="col-span-4 bg-black text-white p-4 rounded-md">
                <h4 className="text-xl font-semibold mb-2">Recent Sign-ins</h4>
                {dashboardData.recentSignIns.map(user => (
                    <div key={user.id} className="flex items-center space-x-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white uppercase">
                            {user.firstName[0]}
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-400">{user.emailAddresses[0].emailAddress}</p>
                        </div>
                        <p className="text-sm">{formatDate(user.lastSignInAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;
