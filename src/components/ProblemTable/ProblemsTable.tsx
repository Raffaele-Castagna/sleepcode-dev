import { problems } from '@/Problems/Problems';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCheckCircle, BsHeart, BsHeartFill } from 'react-icons/bs';
import {AiFillYoutube} from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube';

import { auth, firestore } from '@/firebase/firebase';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { DBproblem } from '@/utils/problems/GenericProblem/genericProblem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authModalState } from '@/atoms/authModelAtom';
import { setLazyProp } from 'next/dist/server/api-utils';
type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable:React.FC<ProblemsTableProps> = ({setLoadingProblems}) => {

const [user] = useAuthState(auth);
    
const [youtubePlay,setYoutubePlay] = useState ( {
    isOpen: false,
    video: ""
})
const problems = useGetProblems(setLoadingProblems);
const solvedProblems = useGetSolvedProblems();
const likedProblems = useGetLikedProblems();

console.log(solvedProblems)
console.log(likedProblems)





const closeYT = () => {
    setYoutubePlay({isOpen:false,video:""})
}
    return (
        <>
        <tbody className="text-white">
            {problems.map((problem,idx) => {
                const diffcolor = problem.difficulty === "Facile" ? "text-dark-green-s" : problem.difficulty === "Medio" ? "text-dark-yellow" : "text-dark-pink";
                return (
                    <tr className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={problem.id}>
                        <th>
                            <div className='px-2 py-2 font-medium whitespace-nowrap text-dark-green-s'> {solvedProblems.includes(problem.id) &&<BsCheckCircle fontsize={"18"} width="18" /> }  </div>
                            <div className='px-2 py-2 font-medium whitespace-nowrap text-dark-pink'> {likedProblems.includes(problem.id) && <BsHeartFill fontsize={"18"} width="18"/>}</div>
                        </th>
                        <td className="px-6 py-4">
                            <Link className="hover:text-blue-600 cursor-pointer" href={`/problems/${problem.id}`}>
                                {problem.title}
                            </Link>
                        </td>
                        <td className={`px-6 py-4 ${diffcolor}`}>
                            {problem.difficulty}
                        </td>
                        <td className={`px-6 py-4`}>
                            {problem.category}
                        </td>
                        <td className={`px-6 py-4`}>
                            {problem.videoId ? (
                                <AiFillYoutube fontsize={"18"} className="cursor-pointer hover:text-red-500" onClick = { () => setYoutubePlay({isOpen:true, video: problem.videoId as string}) } />
                            ) : ( <p className='text-gray-400'>N/A</p>)

                            }
                        </td>
                    </tr>
                )
            })
            }
        </tbody>
        
        { // Se true render else not
        
        youtubePlay.isOpen && ( 
        
        <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center ' onClick={closeYT} >
		<div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' ></div>
		<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
			<div className='w-full h-full flex items-center justify-center relative'>
				<div className='w-full relative'>
					<IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0' onClick={closeYT}  />
					<YouTube videoId={youtubePlay.video} loading='lazy' iframeClassName='w-full min-h-[500px]' />
				</div>
			</div>
		</div>
         
</tfoot>
    )}  
        </>
    )
}
export default ProblemsTable;


function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBproblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(firestore,"problems"),orderBy("order","asc"))
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            const tmp: DBproblem[] = [];
            querySnapshot.forEach((doc) => {
                tmp.push({id:doc.id,...doc.data()} as DBproblem)
            })
            setProblems(tmp);
            setLoadingProblems(false);
            
        }

        getProblems()
    },[setLoadingProblems])
    return problems;
}


function useGetLikedProblems(){
    const [likedproblems,setlikedproblems] = useState<string[]>([]);
    const [user] = useAuthState(auth)
    useEffect(() => {
        const getLikedProblems = async () => {
            const userRef = doc(firestore,"users",user!.uid)
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()){
                setlikedproblems(userDoc.data().likedP)
            }
        }
        if (user) getLikedProblems();
        if (!user) setlikedproblems([]);
    }, [user])

    return likedproblems
}

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

