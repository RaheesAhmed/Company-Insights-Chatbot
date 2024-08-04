import  { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';



export  async function GET(req: NextRequest, res: NextResponse) {
   
    try {
        const users = await clerkClient.users.getUserList();
        return  NextResponse.json({users: users});
    } catch (error) {
        console.error(error);
        return  NextResponse.json({users: "No users found"});
    }
}


export async function DELETE(request:NextRequest) {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
  
    try {
      await clerkClient.users.deleteUser(userId);
      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
  }