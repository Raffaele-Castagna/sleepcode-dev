import AuthModel from '@/components/AuthModel';
import Login from '@/components/Login';
import NavBar from '@/components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModelAtom';
import { useRecoilValue } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const AuthModal = useRecoilValue(authModalState);
    const [user,loading,error] = useAuthState(auth);
    const [pageLoading,setPageLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (user) router.push("/")
        if (!loading && !user) setPageLoading(false);
    },[user,router,loading]);

    if (pageLoading) return null;
    return <div className="bg-dark-layer-2 h-screen relative">
    <NavBar />
    <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none bg-cover bg-center objec relative">
        <img src="/totti.jpg" alt="Capitano img" className="w-full h-full object-cover absolute"/>
    </div>
    {AuthModal.isOpen && <AuthModel />}
</div>
}
export default AuthPage;