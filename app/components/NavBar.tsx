// navbar.tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className=" w-full  bg-gradient-to-r from-stone-900 to-gray-800  text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                <Link href="/" className="text-white hover:text-white">NexAI</Link>
            </div>
            <SignedOut>
                <div className="flex gap-4">
                    <SignInButton mode="modal" className="text-white bg-black  hover:bg-gradient-to-r from-stone-900 to-gray-800 hover:text-brand-white font-bold py-2 px-4 rounded">Login</SignInButton>
                    <SignUpButton mode="modal" className="text-white bg-black hover:bg-gradient-to-r from-stone-900 to-gray-800 hover:text-brand-white py-2 px-4 rounded">Sign Up</SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    );
};

export default NavBar;
