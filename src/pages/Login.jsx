import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AnimatedLogin from '../components/ui/AnimatedLogin';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/activity');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <AnimatedLogin />
    );
}
