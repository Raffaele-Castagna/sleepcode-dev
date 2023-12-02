import AuthModel from '@/components/AuthModel';
import Login from '@/components/Login';
import NavBar from '@/components/NavBar/NavBar';
import React from 'react';
import { authModalState } from '@/atoms/authModelAtom';
import { useRecoilValue } from 'recoil';
type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const AuthModal = useRecoilValue(authModalState);
    return <div className="bg-dark-layer-2 h-screen relative">
    <NavBar />
    <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none bg-cover bg-center objec relative">
        <img src="/totti.jpg" alt="Capitano img" className="w-full h-full object-cover absolute"/>
    </div>
    {AuthModal.isOpen && <AuthModel />}
</div>
}
export default AuthPage;