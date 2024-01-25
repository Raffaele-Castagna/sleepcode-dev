import React, { useState } from 'react';
import Split from 'react-split'
import Description from './Description/Description';
import Editor from './Editor/Editor';
import { Problem } from '@/utils/problems/GenericProblem/genericProblem';

type WorkspaceProps = {
    problem: Problem
  
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    const [solved,setsolved] = useState(false);
    const [success,setSuccess] = useState(false);
    return <Split className="split">
        <Description problem={problem} _solved={solved} ></Description>
        <Editor problem={problem} setsolved={setsolved}></Editor>

    </Split>

}
export default Workspace;