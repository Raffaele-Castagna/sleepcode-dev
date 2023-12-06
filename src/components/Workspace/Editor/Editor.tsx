import React from 'react';
import Selector from './Selector/Selector';
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

type EditorProps = {
    
};

const Editor:React.FC<EditorProps> = () => {
    
    return (
        <div className="flex flex-col bg-dark-layer-1 relative">

            <Selector/>

                <Split className="h-[calc(100vh-94px)] " direction="vertical" sizes={[60,40]} minSize={60}>
                        <div className="w-full voerflow-auto">
                            <CodeMirror 
                            value="const a = 1;"
                            theme={vscodeDark}
                            extensions={[javascript()]}
                            style={{fontSize:16}} />
                        </div>
                        <div className='="w-full px-5 overflow-auto'>
                            <div className='flex h-10 items-center space-x-6'>
                                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                    <div className="text-sm font-medium leading-5 text-white">Testcase</div>
                                    <hr className="absolute bottom-0 h-0.5 w-12 rounded-full border-none bg-white"></hr>
                                </div>
                            </div>
                        </div>
                </Split>
    </div>
    )
}
export default Editor;