import { problems } from '@/Problems/Problems';
import FilterOptions from '@/components/Filters/FilterOptions';
import ProblemsTable from '@/components/ProblemTable/ProblemsTable';
import TopNavBar from '@/components/TopNavBar/TopNavBar';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type catalogueProps = {
    
};


// preso da flowbite
const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Caricamento...</span>
		</div>
	);
};
const catalogue:React.FC<catalogueProps> = () => {
    
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [loadingProblem,setLoadingProblems] = useState(false);
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const solvedProblems = useGetSolvedProblems();
   
    return (
        <>
        
          <main className='bg-dark-layer-2 min-h-screen'>
            <TopNavBar problemPage={false}/>
            <h1 className='text-2xl text-center text-white dark:text-white font-medium uppercase mt-10 mb-5'> DAJE ROMA 
      </h1>

      <div className='justify-center flex items-center '><FilterOptions /></div>
    
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
        {loadingProblem && (
          <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
              {
                <><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /></>
              }

          </div>
        )}
      <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
        {!loadingProblem && (
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
        )}
        <ProblemsTable setLoadingProblems = {setLoadingProblems} solvedProblems={solvedProblems}/>
      </table>
      </div>
      <div className='flex justify-center items-center'>
        {!loadingProblem && (
          <div className= "max-w-sm p-6 bg-dark-layer-1 border-gray-200 rounded-lg shadow flex justify-center items-center">
          <div className="font-bold w-40 h-40 text-white rounded-full bg-dark-fill-3 flex items-center justify-center font-mono text-5xl">{solvedProblems.length}/{problems.length}</div>
    
              </div> 
          
          

        
        )}
        </div>
      </main>
        </>
      );
}
export default catalogue;

function useGetSolvedProblems(){
  const [solvedProblems,setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth)
  useEffect(() => {
      const getSolvedProblems = async () => {
          const userRef = doc(firestore,"users",user!.uid)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()){
              setSolvedProblems(userDoc.data().solvedProblems)
          }
      }
      if (user) getSolvedProblems();
      console.log("called")
      if (!user) setSolvedProblems([]);
  }, [user])

  return solvedProblems
}

