import React from 'react';
import Split from 'react-split'
import Description from './Description/Description';
import Editor from './Editor/Editor';
type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return <Split className="split">
        <Description></Description>
        <Editor></Editor>

    </Split>

}
export default Workspace;