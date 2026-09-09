'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
    const pathname = usePathname();
    const tracked = useRef(false);

    useEffect(() => {
        // Only fire once per page mount — avoids double-send in React Strict Mode
        if (tracked.current) return;
        tracked.current = true;

        const payload = {
            path: pathname,
            referrer: document.referrer ?? '',
        };

        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            // Use keepalive so the request completes even if the user navigates away
            keepalive: true,
        }).catch(() => {
            // Analytics errors must never be visible to users
        });
    }, [pathname]);

    return null; // renders nothing
}
