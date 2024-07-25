// pages/api/users.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export default async function GET(req, res: NextResponse) {
    
        const apiKey = process.env.CLERK_API_KEY; // Securely stored API key
        const url = 'https://api.clerk.dev/v1/users';

        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${apiKey}` }
            });
            return NextResponse.json(response.data);  // Using NextResponse to directly return JSON
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return new NextResponse(JSON.stringify({ error: 'Failed to fetch users' }))
        
    } 
}
