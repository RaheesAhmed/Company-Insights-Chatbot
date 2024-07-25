// navbar.tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-brand-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                <Link href="/" className="text-brand-dark hover:text-brand-black">NexAI</Link>
            </div>
            <SignedOut>
                <div className="flex gap-4">
                    <SignInButton mode="modal" className="text-brand-dark bg-transparent border-2 border-brand-dark hover:bg-brand-dark hover:text-brand-white font-bold py-2 px-4 rounded">Login</SignInButton>
                    <SignUpButton mode="modal" className="bg-brand-dark hover:bg-brand-black text-brand-white font-bold py-2 px-4 rounded">Sign Up</SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    );
};

export default NavBar;
