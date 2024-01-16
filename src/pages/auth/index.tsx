import AuthModel from '@/components/AuthModel';
import Login from '@/components/Login';
import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModelAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const AuthModal = useRecoilValue(authModalState);
    const [user,loading,error] = useAuthState(auth);
    const [pageLoading,setPageLoading] = useState(true);
    const router = useRouter();

    /* <div className="flex items-center justify-center pointer-events-none select-none bg-cover bg-center object relative blur-sm">
    <img src="/totti.jpg" alt="Capitano img" className="w-full h-full object-cover absolute"/>
    </div>*/
        
    useEffect(() => {
    })
    return <div className="bg-dark-layer-2 h-screen grid">
    <TopNavBar problemPage={false} />
    <div className="relative pt-16 pb-32 h-[calc(100vh-5rem)] flex content-center items-center justify-center"
  style={{
    minHeight: "75vh"
  }}>
  <div className="absolute top-0 w-full h-full bg-center bg-cover blur-sm"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }}>
        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-neutral-900"></span>
    
  </div>
  <div className="container relative mx-auto">
    <div className="items-center flex flex-wrap">
      <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
        <div className="pr-12">
          <h1 className="text-white font-semibold text-5xl">
            30L a ASD Assicurato!
              </h1>
          <p className="mt-4 text-lg text-gray-300">
            Tutto inizia qui, consulta il catalogo oppure crea un account per tracciare i progressi.
              </p>
        </div>
      </div>

    </div>
  </div>
  <div
    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
    style={{ height: "70px" }}
  >
    
  </div>
</div>
    {AuthModal.isOpen && !user && <AuthModel />}
</div>
}
export default AuthPage;