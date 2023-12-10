import TopNavBar from '@/components/TopNavBar/TopNavBar';
import Workspace from '@/components/Workspace/Workspace';
import useHasMounted from '@/hooks/useHasMounted';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/problems/GenericProblem/genericProblem';
import React from 'react';

type ProblemPageProps = {
    problem:Problem
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {
    const hasMounted= useHasMounted();
    if (!hasMounted) return null;
    return <div><TopNavBar problemPage={true}/>
    <Workspace problem={problem}></Workspace>
    
    
    
    </div>
}
export default ProblemPage;
export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params:{pid:key}
    }))

    return {
        paths,
        //404
        fallback: false,
    }
}


export async function getStaticProps({params}:{params:{pid:string}}) {
    const {pid} = params;
    const problem = problems[pid]


    if (!problem) {
        return {
            notFound:true
        }
    }
    //LASCIARE senno json non riesce a leggere
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props:{
            problem
        }
    }
}

