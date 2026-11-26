'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getOrCreateVisitorId(): string | undefined {
    try {
        const key = 'cw_vid';
        let id = window.localStorage.getItem(key);
        if (!id) {
            id =
                typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                    ? crypto.randomUUID()
                    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
            window.localStorage.setItem(key, id);
        }
        return id;
    } catch {
        return undefined;
    }
}

export default function VisitTracker() {
    const pathname = usePathname();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        if (!pathname || pathname.startsWith('/analytics')) return;
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '0.0.0.0') {
            return;
        }
        try {
            if (window.localStorage.getItem('cw_ignore_analytics') === '1') return;
        } catch {
            // ignore storage errors
        }
        // Avoid double-send in React Strict Mode for the same path
        if (lastTrackedPath.current === pathname) return;
        lastTrackedPath.current = pathname;

        const searchParams = new URLSearchParams(window.location.search);
        const timezone = (() => {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch {
                return undefined;
            }
        })();

        const payload = {
            path: pathname,
            referrer: document.referrer ?? '',
            utmSource: searchParams.get('utm_source') ?? undefined,
            utmMedium: searchParams.get('utm_medium') ?? undefined,
            utmCampaign: searchParams.get('utm_campaign') ?? undefined,
            screen: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || undefined,
            timezone,
            visitorId: getOrCreateVisitorId(),
        };

        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
        }).catch(() => {
            // Analytics errors must never be visible to users
        });
    }, [pathname]);

    return null;
}
