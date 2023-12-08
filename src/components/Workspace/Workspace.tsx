import React from 'react';
import Split from 'react-split'
import Description from './Description/Description';
import Editor from './Editor/Editor';
import { Problem } from '@/utils/problems/GenericProblem/genericProblem';

type WorkspaceProps = {
    problem: Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    
    return <Split className="split">
        <Description problem={problem}></Description>
        <Editor problem={problem}></Editor>

    </Split>

}
export default Workspace;