import React, { useState } from 'react';
import Selector from './Selector/Selector';
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import Footer from '../Footer';
import { Problem } from '@/utils/problems/GenericProblem/genericProblem';
import test from 'node:test';

type EditorProps = {
    problem: Problem
};

const Editor:React.FC<EditorProps> = ({problem}) => {
   const [testcase,setTestCase] = useState<number>(0);
    
    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">

            <Selector/>

                <Split className="h-[calc(100vh-94px)] " direction="vertical" sizes={[60,40]} minSize={40}>
                        <div className="w-full overflow-auto">
                            <CodeMirror 
                            value={problem.starterCode}
                            theme={vscodeDark}
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
                <Footer />
                
    </div>
    )
}
export default Editor;