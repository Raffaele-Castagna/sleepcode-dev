import Link from 'next/link';
import React from 'react';

type TopNavBarProps = {
    
};

const TopNavBar:React.FC<TopNavBarProps> = () => {
    
    return (<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
        <Link href='/' className='h-[22px] flex-1'>
            <img src='/new_logo.svg' alt='Logo' className='h-full' />
        </Link>

        <div className='flex items-center space-x-4 flex-1 justify-end'>
            <div>
                <a
                    target='_blank'
                    rel='noreferrer'
                    className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
                >
                    Premium
                </a>
            </div>
            <Link href='/auth'>
                <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
            </Link>
        </div>
    </div>
</nav> )
}
export default TopNavBar;