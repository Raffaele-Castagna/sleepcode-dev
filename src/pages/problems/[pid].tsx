import TopNavBar from '@/components/TopNavBar/TopNavBar';
import Workspace from '@/components/Workspace/Workspace';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return <div><TopNavBar problemPage={true}/>
    <Workspace/>
    
    
    
    </div>
}
export default ProblemPage;