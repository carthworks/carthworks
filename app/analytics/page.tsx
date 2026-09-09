import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStats, detectDevice } from '@/lib/analytics';

export const metadata: Metadata = {
    title: 'Analytics | Karthikeyan T',
    robots: {
        index: false,
        follow: false,
    },
};

// Server component — data fetched at request time, secret checked server-side
export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<{ key?: string }>;
}

export default async function AnalyticsPage({ searchParams }: Props) {
    const params = await searchParams;
    const secret = process.env.ANALYTICS_SECRET;

    // If a secret is configured, enforce it
    if (secret && params.key !== secret) {
        notFound();
    }

    const stats = await getStats();

    const maxPageViews = stats.byPage[0]?.count ?? 1;

    function timeAgo(ts: number): string {
        const diff = Date.now() - ts;
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    }

    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0f1a 100%)',
            color: '#e2e8f0',
            fontFamily: 'var(--font-inter, system-ui, sans-serif)',
            padding: '2rem 1rem',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: stats.usingRedis ? '#22c55e' : '#f59e0b',
                            boxShadow: stats.usingRedis ? '0 0 8px #22c55e' : '0 0 8px #f59e0b',
                        }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            {stats.usingRedis ? 'Live · Upstash Redis' : 'In-memory (no Redis configured)'}
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                        fontWeight: 800,
                        background: 'linear-gradient(90deg, #e2e8f0, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                    }}>
                        Analytics
                    </h1>
                    <p style={{ color: '#64748b', marginTop: '0.25rem', fontSize: '0.875rem' }}>
                        carthworks.dev · visitor intelligence
                    </p>
                </div>

                {/* Stat Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    {[
                        { label: 'Total Page Views', value: stats.totalViews.toLocaleString(), icon: '👁', color: '#6366f1' },
                        { label: 'Unique Visitors', value: stats.uniqueIps.toLocaleString(), icon: '👤', color: '#22c55e' },
                        { label: 'Pages Tracked', value: stats.byPage.length.toLocaleString(), icon: '📄', color: '#f59e0b' },
                        { label: 'Countries', value: stats.byCountry.length > 0 ? stats.byCountry.length.toLocaleString() : '—', icon: '🌍', color: '#ec4899' },
                    ].map(card => (
                        <div key={card.label} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: `linear-gradient(90deg, ${card.color}, transparent)`,
                            }} />
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
                            <div style={{
                                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                                fontWeight: 800,
                                color: card.color,
                                lineHeight: 1,
                                marginBottom: '0.25rem',
                            }}>
                                {card.value}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Two-column: Pages + Countries */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    {/* Top Pages */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                    }}>
                        <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                            Top Pages
                        </h2>
                        {stats.byPage.length === 0 ? (
                            <p style={{ color: '#475569', fontSize: '0.875rem' }}>No data yet</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {stats.byPage.slice(0, 10).map(({ page, count }) => (
                                    <div key={page}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                                                {page}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>{count}</span>
                                        </div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${(count / maxPageViews) * 100}%`,
                                                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                                                borderRadius: '2px',
                                                transition: 'width 0.4s ease',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Countries */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                    }}>
                        <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                            Countries
                        </h2>
                        {stats.byCountry.length === 0 ? (
                            <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                                {stats.usingRedis
                                    ? 'Country data requires Vercel deployment (x-vercel-ip-country header)'
                                    : 'No data yet — country data available in production'}
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {stats.byCountry.slice(0, 10).map(({ country, count }) => (
                                    <div key={country} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{country}</span>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            background: 'rgba(236,72,153,0.15)',
                                            color: '#ec4899',
                                            padding: '0.1rem 0.5rem',
                                            borderRadius: '999px',
                                            fontWeight: 600,
                                        }}>{count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Visits Table */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    overflow: 'hidden',
                }}>
                    <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                        Recent Visits
                    </h2>
                    {stats.recent.length === 0 ? (
                        <p style={{ color: '#475569', fontSize: '0.875rem' }}>No visits recorded yet. Visit the homepage to start tracking.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                        {['Time', 'IP (anonymised)', 'Page', 'Device', 'Country', 'Referrer'].map(h => (
                                            <th key={h} style={{
                                                textAlign: 'left',
                                                padding: '0.5rem 0.75rem',
                                                color: '#64748b',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase',
                                                fontSize: '0.7rem',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recent.map((v, i) => {
                                        const device = detectDevice(v.ua);
                                        const deviceIcon = { mobile: '📱', tablet: '📱', desktop: '🖥', bot: '🤖' }[device];
                                        return (
                                            <tr key={i} style={{
                                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                                transition: 'background 0.15s',
                                            }}>
                                                <td style={{ padding: '0.6rem 0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                                                    {timeAgo(v.ts)}
                                                </td>
                                                <td style={{ padding: '0.6rem 0.75rem', fontFamily: 'monospace', color: '#94a3b8' }}>
                                                    {v.ip}
                                                </td>
                                                <td style={{ padding: '0.6rem 0.75rem', color: '#cbd5e1', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {v.path}
                                                </td>
                                                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>
                                                    <span title={device}>{deviceIcon}</span>
                                                </td>
                                                <td style={{ padding: '0.6rem 0.75rem', color: '#94a3b8' }}>
                                                    {v.country ?? '—'}
                                                </td>
                                                <td style={{ padding: '0.6rem 0.75rem', color: '#475569', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {v.referrer || '—'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', marginTop: '2rem' }}>
                    IPs anonymised (last octet zeroed) · Data expires after 90 days · {new Date().toUTCString()}
                </p>
            </div>
        </main>
    );
}
