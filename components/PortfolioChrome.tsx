'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import ThemeSelector from '@/components/ThemeSelector';
import VisitTracker from '@/components/VisitTracker';
import PageLoader from '@/components/PageLoader';

export default function PortfolioChrome() {
    const pathname = usePathname();
    if (pathname?.startsWith('/analytics')) {
        return null;
    }

    return (
        <>
            <PageLoader />
            <Nav />
            <ThemeSelector />
            <VisitTracker />
        </>
    );
}
