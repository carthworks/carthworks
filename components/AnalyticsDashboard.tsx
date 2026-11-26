'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AnalyticsStats } from '@/lib/analytics';

interface AnalyticsDashboardProps {
    stats: AnalyticsStats;
}

function countryFlag(code?: string): string {
    if (!code || code.length !== 2) return '🌐';
    const upper = code.toUpperCase();
    return String.fromCodePoint(...Array.from(upper).map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function countryName(code?: string): string {
    if (!code) return 'Unknown';
    try {
        const dn = new Intl.DisplayNames(['en'], { type: 'region' });
        return dn.of(code.toUpperCase()) ?? code;
    } catch {
        return code;
    }
}

function timeAgo(ts: number): string {
    const diff = Date.now() - ts;
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return 'just now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

function deviceBadge(device?: string): { icon: string; label: string } {
    switch (device) {
        case 'mobile':
            return { icon: '📱', label: 'Mobile' };
        case 'tablet':
            return { icon: '📲', label: 'Tablet' };
        case 'bot':
            return { icon: '🤖', label: 'Bot' };
        default:
            return { icon: '🖥', label: 'Desktop' };
    }
}

function BarList({
    title,
    subtitle,
    items,
    accentClass,
    emptyText = 'No data yet',
}: {
    title: string;
    subtitle: string;
    items: Array<{ label: string; count: number; meta?: string }>;
    accentClass: string;
    emptyText?: string;
}) {
    const max = items[0]?.count ?? 1;
    return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
            <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {title}
                </h2>
                <span className="text-[11px] text-zinc-600">{subtitle}</span>
            </div>
            {items.length === 0 ? (
                <p className="text-xs text-zinc-600">{emptyText}</p>
            ) : (
                <div className="space-y-3">
                    {items.slice(0, 8).map((item) => (
                        <div key={item.label}>
                            <div className="flex items-center justify-between gap-2 text-xs mb-1">
                                <span className="truncate text-zinc-200 font-medium">
                                    {item.label}
                                    {item.meta && (
                                        <span className="ml-1.5 text-zinc-500 font-normal">
                                            {item.meta}
                                        </span>
                                    )}
                                </span>
                                <span className="text-zinc-400 font-mono tabular-nums shrink-0">
                                    {item.count}
                                </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${accentClass}`}
                                    style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function AnalyticsDashboard({ stats }: AnalyticsDashboardProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const filteredVisits = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return stats.recent;
        return stats.recent.filter((v) =>
            [
                v.ip,
                v.path,
                v.source,
                v.referrer,
                v.utmSource,
                v.utmCampaign,
                v.country,
                v.country ? countryName(v.country) : '',
                v.city,
                v.region,
                v.timezone,
                v.browser,
                v.os,
                v.device,
                v.language,
            ]
                .filter(Boolean)
                .some((field) => String(field).toLowerCase().includes(q))
        );
    }, [query, stats.recent]);

    function handleRefresh() {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 600);
    }

    async function handleLogout() {
        setLoggingOut(true);
        await fetch('/api/analytics/auth', { method: 'DELETE' }).catch(() => {});
        router.refresh();
    }

    function handleExportCsv() {
        const headers = [
            'timestamp',
            'ip',
            'returning',
            'device',
            'browser',
            'os',
            'language',
            'screen',
            'source',
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'referrer',
            'country',
            'region',
            'city',
            'timezone',
            'path',
        ];
        const escape = (val: unknown) => {
            const s = val == null ? '' : String(val);
            return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        };
        const rows = filteredVisits.map((v) =>
            [
                new Date(v.ts).toISOString(),
                v.ip,
                v.returning ? 'returning' : 'new',
                v.device ?? '',
                v.browser ?? '',
                v.os ?? '',
                v.language ?? '',
                v.screen ?? '',
                v.source ?? 'Direct',
                v.utmSource ?? '',
                v.utmMedium ?? '',
                v.utmCampaign ?? '',
                v.referrer ?? '',
                v.country ?? '',
                v.region ?? '',
                v.city ?? '',
                v.timezone ?? '',
                v.path,
            ]
                .map(escape)
                .join(',')
        );
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const topSource = stats.bySource[0]?.source ?? '—';

    return (
        <main className="min-h-screen bg-[#09090d] text-zinc-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                    stats.usingRedis
                                        ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                                        : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                                }`}
                            />
                            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                                {stats.usingRedis
                                    ? 'Live · Upstash Redis'
                                    : 'Local · In-Memory Store'}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
                            Visitor Intelligence
                        </h1>
                        <p className="text-xs text-zinc-500 mt-0.5">
                            Private analytics · Who · From · Where
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-200 transition-colors"
                        >
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                        <button
                            type="button"
                            onClick={handleExportCsv}
                            disabled={filteredVisits.length === 0}
                            className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-40 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors"
                        >
                            Export CSV
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 text-xs font-medium text-rose-300 transition-colors"
                        >
                            {loggingOut ? 'Locking...' : 'Lock'}
                        </button>
                    </div>
                </header>

                {/* KPI Cards */}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: 'Total Page Views',
                            value: stats.totalViews.toLocaleString(),
                            accent: 'text-indigo-400',
                        },
                        {
                            label: 'Unique Visitors',
                            value: stats.uniqueVisitors.toLocaleString(),
                            accent: 'text-emerald-400',
                        },
                        {
                            label: 'Countries',
                            value:
                                stats.byCountry.length > 0
                                    ? stats.byCountry.length.toLocaleString()
                                    : '—',
                            accent: 'text-pink-400',
                        },
                        {
                            label: 'Top Source',
                            value: topSource,
                            accent: 'text-amber-400',
                        },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
                        >
                            <div className={`text-2xl sm:text-3xl font-bold truncate ${card.accent}`}>
                                {card.value}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">{card.label}</div>
                        </div>
                    ))}
                </section>

                {/* WHO / FROM / WHERE Breakdowns */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* WHERE: Countries */}
                    <BarList
                        title="Where · Countries"
                        subtitle="Geo"
                        accentClass="bg-gradient-to-r from-pink-500 to-rose-400"
                        emptyText="Country headers populate on Vercel / Cloudflare deployments."
                        items={stats.byCountry.map(({ country, count }) => ({
                            label: `${countryFlag(country)} ${countryName(country)}`,
                            meta: country,
                            count,
                        }))}
                    />

                    {/* FROM: Sources & Referrers */}
                    <BarList
                        title="From · Traffic Sources"
                        subtitle="Referrer / UTM"
                        accentClass="bg-gradient-to-r from-amber-500 to-orange-400"
                        items={stats.bySource.map(({ source, count }) => ({
                            label: source,
                            count,
                        }))}
                    />

                    {/* WHERE: Top Pages */}
                    <BarList
                        title="Where · Top Pages"
                        subtitle="Paths"
                        accentClass="bg-gradient-to-r from-indigo-500 to-violet-400"
                        items={stats.byPage.map(({ page, count }) => ({
                            label: page,
                            count,
                        }))}
                    />

                    {/* WHO: Devices */}
                    <BarList
                        title="Who · Devices"
                        subtitle="Form Factor"
                        accentClass="bg-gradient-to-r from-emerald-500 to-teal-400"
                        items={stats.byDevice.map(({ device, count }) => {
                            const b = deviceBadge(device);
                            return { label: `${b.icon} ${b.label}`, count };
                        })}
                    />

                    {/* WHO: Browsers */}
                    <BarList
                        title="Who · Browsers"
                        subtitle="Recent 100"
                        accentClass="bg-gradient-to-r from-sky-500 to-cyan-400"
                        items={stats.byBrowser.map(({ browser, count }) => ({
                            label: browser,
                            count,
                        }))}
                    />

                    {/* WHO: OS & Cities */}
                    <BarList
                        title="Who · Operating Systems"
                        subtitle="Recent 100"
                        accentClass="bg-gradient-to-r from-purple-500 to-fuchsia-400"
                        items={stats.byOS.map(({ os, count }) => ({
                            label: os,
                            count,
                        }))}
                    />
                </section>

                {stats.byCity.length > 0 && (
                    <section>
                        <BarList
                            title="Where · Top Cities"
                            subtitle="Recent 100"
                            accentClass="bg-gradient-to-r from-rose-500 to-pink-400"
                            items={stats.byCity.map(({ city, country, count }) => ({
                                label: `${countryFlag(country)} ${city}`,
                                meta: country,
                                count,
                            }))}
                        />
                    </section>
                )}

                {/* Recent Visits Log */}
                <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Recent Visits ({filteredVisits.length})
                            </h2>
                            <p className="text-[11px] text-zinc-600 mt-0.5">
                                Full breakdown of who visited, where they came from, and where they are
                            </p>
                        </div>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Filter by city, country, source, browser, IP..."
                            className="w-full sm:w-72 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/70 focus:outline-none"
                        />
                    </div>

                    {filteredVisits.length === 0 ? (
                        <p className="text-xs text-zinc-500 py-6 text-center">
                            {stats.recent.length === 0
                                ? 'No visits recorded yet. Open your portfolio homepage to record a visit.'
                                : 'No visits match your filter.'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-white/[0.08] text-left text-[11px] uppercase tracking-wider text-zinc-500">
                                        <th className="py-2.5 px-3">When</th>
                                        <th className="py-2.5 px-3">Who</th>
                                        <th className="py-2.5 px-3">From</th>
                                        <th className="py-2.5 px-3">Where</th>
                                        <th className="py-2.5 px-3">Page</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {filteredVisits.map((v, idx) => {
                                        const dev = deviceBadge(v.device);
                                        const locationParts = [v.city, v.region, v.country ? countryName(v.country) : undefined].filter(Boolean);
                                        return (
                                            <tr
                                                key={`${v.ts}-${idx}`}
                                                className="hover:bg-white/[0.02] transition-colors"
                                            >
                                                {/* When */}
                                                <td
                                                    className="py-3 px-3 whitespace-nowrap text-zinc-400"
                                                    title={new Date(v.ts).toLocaleString()}
                                                >
                                                    <div>{timeAgo(v.ts)}</div>
                                                    <div className="text-[10px] text-zinc-600">
                                                        {new Date(v.ts).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </td>

                                                {/* Who */}
                                                <td className="py-3 px-3 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 text-zinc-200">
                                                        <span title={dev.label}>{dev.icon}</span>
                                                        <span>
                                                            {v.browser ?? 'Unknown'} · {v.os ?? 'Unknown'}
                                                        </span>
                                                        {v.returning !== undefined && (
                                                            <span
                                                                className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                                                    v.returning
                                                                        ? 'bg-emerald-500/15 text-emerald-300'
                                                                        : 'bg-indigo-500/15 text-indigo-300'
                                                                }`}
                                                            >
                                                                {v.returning ? 'Returning' : 'New'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                                                        {v.ip}
                                                        {v.language ? ` · ${v.language}` : ''}
                                                        {v.screen ? ` · ${v.screen}` : ''}
                                                    </div>
                                                </td>

                                                {/* From */}
                                                <td className="py-3 px-3 max-w-[200px]">
                                                    <div className="text-zinc-200 truncate">
                                                        {v.source ?? 'Direct'}
                                                    </div>
                                                    {(v.utmCampaign || v.utmMedium || v.referrer) && (
                                                        <div
                                                            className="text-[11px] text-zinc-500 truncate"
                                                            title={v.referrer || undefined}
                                                        >
                                                            {v.utmCampaign
                                                                ? `campaign: ${v.utmCampaign}`
                                                                : v.utmMedium
                                                                  ? `medium: ${v.utmMedium}`
                                                                  : v.referrer}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Where */}
                                                <td className="py-3 px-3 whitespace-nowrap">
                                                    <div className="text-zinc-200">
                                                        {countryFlag(v.country)}{' '}
                                                        {locationParts.length > 0
                                                            ? locationParts.join(', ')
                                                            : 'Unknown'}
                                                    </div>
                                                    {v.timezone && (
                                                        <div className="text-[11px] text-zinc-500">
                                                            {v.timezone}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Page */}
                                                <td
                                                    className="py-3 px-3 font-mono text-zinc-300 max-w-[180px] truncate"
                                                    title={v.path}
                                                >
                                                    {v.path}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <footer className="text-center text-[11px] text-zinc-600 pt-2">
                    IPs anonymised (last octet zeroed) · 90-day retention · Private session expires in 24h
                </footer>
            </div>
        </main>
    );
}
