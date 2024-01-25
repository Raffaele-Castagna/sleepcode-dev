/* eslint-disable react-hooks/rules-of-hooks */
import { authModalState } from '@/atoms/authModelAtom';
import DeleteProgress from '@/components/DeleteAccount/DeleteAccount';
import ModifyPw from '@/components/ModifyPw';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const auth = getAuth();
    const router = useRouter();
    const [pageLoading,setPageLoading] = useState(true)
    const [user,loading,error] = useAuthState(auth);
    useEffect(() => {
     if (user) {setPageLoading(false)}else {
        router.push("/auth")
     }
    
    },[])
    auth.onAuthStateChanged(() => {
     if (pageLoading){
     setPageLoading(false)
     }
    })

    if (pageLoading) return null;
    return (
    <main className='bg-dark-layer-2 min-h-screen'>
    <div>
        <TopNavBar problemPage={false}/>
            <div className='justify-center grid '>
                <div><ModifyPw/>
                
                </div>
                
                <div>
                    <DeleteProgress></DeleteProgress>
                </div>

                </div>
            </div>
    </main>)
}
export default index;