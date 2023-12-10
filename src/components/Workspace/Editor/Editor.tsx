import React, { useEffect, useState } from 'react';
import Selector from './Selector/Selector';
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import Footer from '../Footer';
import { Problem } from '@/utils/problems/GenericProblem/genericProblem';
import test from 'node:test';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { pid } from 'node:process';
import { useRouter } from 'next/router';
import { problems } from '@/utils/problems';
import { toast } from 'react-toastify';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


type EditorProps = {
    problem: Problem;
    setsolved: React.Dispatch<React.SetStateAction<boolean>>
};

const Editor:React.FC<EditorProps> = ({problem,setsolved}) => {
   const [testcase,setTestCase] = useState<number>(0);
   const [user] = useAuthState(auth)
   const {query : {pid} } = useRouter();
   const handleSubmit = async () => {
    try {
        usercode = usercode.slice(usercode.indexOf(problem.starterFunctionName));
		const cb = new Function(`return ${usercode}`)();
		const handler = problems[pid as string].handlerFunction;
        if (typeof handler === "function") {
            const success = handler(cb);
        if (success){
            toast.success("Tutti i test case passati, bravo!",{position:'top-center', autoClose:3000 , theme: 'dark'})
            if (user) {
            const userRef = doc(firestore,"users",user!.uid)
            await updateDoc(userRef,{solvedProblems:arrayUnion(pid)})
            setsolved(true);
            }

        }else {
            toast.error("Uno o più test case non sono passati, riprova!",{position:'top-center', autoClose:3000 , theme: 'dark'})
        }
    } 

    }catch (error:any){
        console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Uno o più test case falliti!", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
	}

   }
}
   //w/o db
   const handleSubmitForRunning = async () => {
    try {
        usercode = usercode.slice(usercode.indexOf(problem.starterFunctionName));
		const cb = new Function(`return ${usercode}`)();
		const handler = problems[pid as string].handlerFunction;
        if (typeof handler === "function") {
            const success = handler(cb);
        if (success){
            toast.success("Tutti i test case passati, bravo!",{position:'top-center', autoClose:3000 , theme: 'dark'})

        }else {
            toast.error("Uno o più test case non sono passati, riprova!",{position:'top-center', autoClose:3000 , theme: 'dark'})
        }
    } 

    }catch (error:any){
        console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Uno o più test case falliti!", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
	}

   }

   }

   useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`)
        if (user){
            setusercode(code ? JSON.parse(code) : problem.starterCode);
        }else {
            setusercode(problem.starterCode)
        }
   },[])

   let [usercode,setusercode] = useState<string>(problem.starterCode);
   const onChange = (value: string) => {
    setusercode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
   }

   

    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">

            <Selector/>

                <Split className="h-[calc(100vh-94px)] " direction="vertical" sizes={[60,40]} minSize={40}>
                        <div className="w-full overflow-auto">
                            <CodeMirror 
                            value={usercode}
                            theme={vscodeDark}
                            onChange={onChange}
                            extensions={[javascript()]}
                            style={{fontSize:16}} />
                        </div>



                        <div className='w-full px-5 overflow-auto'>



                           { /* testcase */}
                            <div className='flex h-10 items-center space-x-6'>
                                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                    <div className="text-sm font-medium leading-5 text-white">Testcase</div>
                                    <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"></hr>
                                </div>
                            </div>
                            <div className='flex'>
                                {problem.examples.map((example,index) => (
                                    /*cases*/
                                <div className="mr-2 items-start mt-2 text-white" key={example.id} onClick={() => {
                                    setTestCase(index)
                                }}>
                                <div className='flex flex-wrap items-center gap-y-4'>
                                    <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap 
                                    ${testcase === index ? "text-gray-500" : ""}  `}>Case {index + 1}</div>
                                </div>
                                </div>
                                ))}
                                </div>





                             
                                {/* input/output */}
                                <div className='font-semibold my-4 pb-5 '>
                                    <p className='text-sm font-medium mt-4 text-white'> Input:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                        {problem.examples[testcase].inputText}
                                    </div>

                                    
                                    <p className='text-sm font-medium mt-4 text-white'> Output:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                    {problem.examples[testcase].outputText}
                                    </div>
                                </div>
                            </div>
                            
                </Split>
                <Footer handleSubmit={handleSubmit} handleSubmitForRunning={handleSubmitForRunning}/>
                
    </div>
    )
}
export default Editor;