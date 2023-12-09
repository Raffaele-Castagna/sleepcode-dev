import AuthModel from '@/components/AuthModel';
import Login from '@/components/Login';
import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModelAtom';
import { useRecoilValue } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const AuthModal = useRecoilValue(authModalState);
    const [user,loading,error] = useAuthState(auth);
    const [pageLoading,setPageLoading] = useState(true);
    const router = useRouter();
        
    useEffect(() => {
    })
    return <div className="bg-dark-layer-2 h-screen relative">
    <TopNavBar problemPage={false} />
    <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none bg-cover bg-center objec relative">
        <img src="/totti.jpg" alt="Capitano img" className="w-full h-full object-cover absolute"/>
    </div>
    {AuthModal.isOpen && !user && <AuthModel />}
</div>
}
export default AuthPage;