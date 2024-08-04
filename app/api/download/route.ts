import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    const directoryPath = path.join(process.cwd(), 'app', 'data'); // Adjust the path to your data directory

    try {
        const files = fs.readdirSync(directoryPath);
        const filesData = files.map(file => {
            const filePath = path.join(directoryPath, file);
            return {
                filename: file,
                content: fs.readFileSync(filePath, 'utf-8') // or 'base64' if binary files
            };
        });

        return new NextResponse(JSON.stringify(filesData), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
