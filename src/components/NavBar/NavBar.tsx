import { authModalState } from '@/atoms/authModelAtom';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type NavBarProps = {
    
};

const NavBar:React.FC<NavBarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    // onclick cambia valore AuthModel to true
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev,isOpen:true}));
    }
    return <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
        <Link href="/" className="flex items-center justify-center h-20">
            <img src="/new_logo.svg" alt="SleepCode" className="h-full" />
        </Link>
            <div className="flex items-center">
                <button className="bg-dark-fill-2 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-transparent
                transition duration-300 ease-in ease-out"
                onClick={handleClick}>Entra</button>
            </div>
    </div>
}
export default NavBar;