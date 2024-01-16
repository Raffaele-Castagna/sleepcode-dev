import { auth, firestore } from '@/firebase/firebase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LogoutLogic from '../LogicaBottoni/LogoutLogic';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModelAtom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BsList } from 'react-icons/bs';
import Timer from '../Timer.tsx/Timer';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';



type TopNavBarProps = {
    problemPage:boolean
};

const TopNavBar:React.FC<TopNavBarProps> = ({problemPage}) => {
    const userRole = useGetUseRole();
    const router = useRouter();
    const [user] = useAuthState(auth)
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
    <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between `}>
        <div className="flex items-center justify-between mx-0 max-w-xs space-x-3">
        <img className='h-[22px] flex-1' src='/new_logo.svg' alt='Logo' />
        <Link href='/auth' className='h-[22px] flex-1'>Home </Link>
        <Link href='/catalogue' className='h-[22px] flex-1'>Catalogo</Link>
        {user && userRole && (

        
        <Link href="/AdminPanel" className='h-[22px] flex'>Admin Panel</Link>
        )}
        </div>
    
        
        
        <div className='flex items-center space-x-4 justify-between ' >
        {problemPage && (
            <Timer/>
        )}
            {!user && (
            <Link href='/auth'>
                <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ' onClick={ () => setAuthModalState ((prev) => ({...prev,isOpen:true, type:"login"}))} >Entra</button>
            </Link>
            )}
            
            {user && (
                <div className="cursor-pointer group relative">
                    <img src="/avatar.png" alt="user profile img" className="h-8 w-8 rounded-full" onClick={() => router.push("/userpage")}></img>
                    <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration 300 ease-in-out"> 
                    <p className="text-sm"> {user.email}</p></div>


                </div>
                
            )}
            {user &&(
            <LogoutLogic />
            ) }
            
        </div>
    </div>
</nav> )
}
export default TopNavBar;

function useGetUseRole(){
    const [userRole,setUserRole] = useState<boolean>()
    const [user] = useAuthState(auth)
    useEffect(() => {
        const getUserRole = async () => {
            const userRef = doc(firestore,"users",user!.uid)
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()){
                if (userDoc.data().role !== "Admin"){
                    setUserRole(false)
                }else {
                    setUserRole(true);
                }
                
            }
        }
        if (user) getUserRole();
        if (!user) setUserRole(false);
    }, [user])
  
    return userRole;
  }