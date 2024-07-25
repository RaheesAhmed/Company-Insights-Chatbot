// pages/api/users.js
import axios from 'axios';
import { NextResponse,NextRequest } from 'next/server';

export async function GET(req:NextRequest, res: NextResponse) {
    
    const apiKey = process.env.CLERK_SECRET_KEY;
    let allUsers: any[] = [];
    let page = 0;
    const limit = 100; // Adjust the limit as needed, keeping it high to minimize requests

    try {
        while (true) {
            const response = await axios.get(`https://api.clerk.dev/v1/users?limit=${limit}&offset=${page * limit}`, {
                headers: { Authorization: `Bearer ${apiKey}` }
            });
            allUsers = allUsers.concat(response.data);
            if (response.data.length < limit) {
                break; // Break the loop if there are no more users to fetch
            }
            page++;
        }
            console.log('Fetched users:', allUsers);
            return NextResponse.json(allUsers);  // Using NextResponse to directly return JSON
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return new NextResponse(JSON.stringify({ error: 'Failed to fetch users' }))
        
    } 
}
