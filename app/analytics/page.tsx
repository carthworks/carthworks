import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getStats } from '@/lib/analytics';
import {
    ANALYTICS_COOKIE_NAME,
    isAnalyticsSecretConfigured,
    verifySessionToken,
} from '@/lib/analytics-auth';
import AnalyticsLogin from '@/components/AnalyticsLogin';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export const metadata: Metadata = {
    title: 'Private',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ANALYTICS_COOKIE_NAME)?.value;
    const isAuthed = await verifySessionToken(token);

    if (!isAuthed) {
        return <AnalyticsLogin configured={isAnalyticsSecretConfigured()} />;
    }

    const stats = await getStats();
    return <AnalyticsDashboard stats={stats} />;
}
