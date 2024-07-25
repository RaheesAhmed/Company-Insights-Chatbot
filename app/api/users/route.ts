// pages/api/users.js
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.CLERK_SECRET_KEY;
    let allUsers = [];
    let page = 0;
    const limit = 100;

    if (req.method === 'GET') {
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
            res.status(200).json(allUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            res.status(500).json({ error: 'Failed to fetch users', details: error.message });
        }
    } else {
        // If a non-GET method is used, return a 405 Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method Not Allowed');
    }
}
