'use client'
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AuthenticatedComponent = ({ children }) => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/'); // Adjust the route as necessary
        } else {
            router.push('/examples/all');
        }
    }, [isSignedIn, router]);

    return <>{children}</>;
}

export default AuthenticatedComponent;