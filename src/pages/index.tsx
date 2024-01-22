import ProblemsTable from '@/components/ProblemTable/ProblemsTable';
import TopNavBar from '@/components/TopNavBar/TopNavBar'
import useHasMounted from '@/hooks/useHasMounted';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth")
  })
  
}
