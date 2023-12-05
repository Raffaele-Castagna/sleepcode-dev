import FilterOptions from '@/components/Filters/FilterOptions';
import ProblemsTable from '@/components/ProblemTable/ProblemsTable';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
import React from 'react';

type catalogueProps = {
    
};

const catalogue:React.FC<catalogueProps> = () => {
    
    return (
        <>
          <main className='bg-dark-layer-2 min-h-screen'>
            <TopNavBar/>
            <h1 className='text-2xl text-center text-white dark:text-white font-medium uppercase mt-10 mb-5'> DAJE ROMA 
      </h1>

      <div className='justify-center flex items-center '><FilterOptions /></div>
    
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
      <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
        <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
          <tr>
            <th scope='col' className='px-1 py-3 w-0 font-medium'>
              Stato
            </th>
            <th scope='col' className='px-6 py-3 w-0 font-medium'>
              Titolo
            </th>
            <th scope='col' className='px-6 py-3 w-0 font-medium'>
              Difficoltà
            </th>
    
            <th scope='col' className='px-6 py-3 w-0 font-medium'>
              Categoria
            </th>
            <th scope='col' className='px-6 py-3 w-0 font-medium'>
              Soluzione
            </th>
          </tr>
        </thead>
        <ProblemsTable/>
      </table>
      </div></main>
        </>
      );
}
export default catalogue;