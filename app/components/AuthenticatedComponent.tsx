'use client'
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


const AuthenticatedComponent = ({ children }: { children: any }) => {
    const { isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            // Redirect to the login page if not signed in
            router.push('/');
        } else {
            router.push('/chat');
        }
    }, [isSignedIn, user, router]);

    // This will only render children if the user is signed in and not trying to access restricted admin content without permission
    return <>{children}</>;
}

export default AuthenticatedComponent;
