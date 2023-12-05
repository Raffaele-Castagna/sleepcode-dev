import TopNavBar from '@/components/TopNavBar/TopNavBar';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return <div><TopNavBar problemPage={true}/></div>
}
export default ProblemPage;