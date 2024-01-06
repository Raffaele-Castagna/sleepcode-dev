/* eslint-disable react-hooks/rules-of-hooks */
import { authModalState } from '@/atoms/authModelAtom';
import DeleteProgress from '@/components/DeleteProgress/DeleteProgress';
import ModifyEmail from '@/components/ModifyEmail';
import ModifyPw from '@/components/ModifyPw';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
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