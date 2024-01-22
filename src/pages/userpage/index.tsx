/* eslint-disable react-hooks/rules-of-hooks */
import { authModalState } from '@/atoms/authModelAtom';
import DeleteProgress from '@/components/DeleteAccount/DeleteAccount';
import ModifyPw from '@/components/ModifyPw';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
        if (user) {console.log("logged in")}else {console.log("not logged in")}
    })
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