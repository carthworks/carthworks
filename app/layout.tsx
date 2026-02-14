import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";
import Nav from "@/components/Nav";
import { personalInfo } from "@/lib/data";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "Karthikeyan T - Senior AI Engineer & SaaS Architect",
    description: "Senior AI Engineer, LLM Engineer, and SaaS Architect with 20+ years of engineering experience designing and delivering AI-powered, multi-tenant SaaS platforms.",
    keywords: ["AI Engineer", "LLM Engineer", "SaaS Architect", "Full Stack Developer", "Next.js", "React", "TypeScript", "AI", "Machine Learning"],
    authors: [{ name: "Karthikeyan T" }],
    creator: "Karthikeyan T",
    metadataBase: new URL('https://carthworks.dev'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://carthworks.dev",
        title: "Karthikeyan T - Senior AI Engineer & SaaS Architect",
        description: "Senior AI Engineer, LLM Engineer, and SaaS Architect with 20+ years of engineering experience",
        siteName: "Karthikeyan T Portfolio",
        images: [
            {
                url: '/kt_logo_github_sized.png',
                width: 800,
                height: 800,
                alt: 'Karthikeyan T Logo',
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Karthikeyan T - Senior AI Engineer & SaaS Architect",
        description: "Senior AI Engineer, LLM Engineer, and SaaS Architect with 20+ years of engineering experience",
        images: ['/kt_logo_github_sized.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/kt_logo_github_sized.png',
        shortcut: '/kt_logo_github_sized.png',
        apple: '/kt_logo_github_sized.png',
    },
    verification: {
        google: 'google-site-verification-code', // User might need to replace this
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        url: 'https://carthworks.dev',
        sameAs: [
            `https://${personalInfo.linkedin}`,
            `https://${personalInfo.github}`,
            `https://${personalInfo.behance}`,
            `https://${personalInfo.flickr}`,
        ],
        description: personalInfo.summary,
        image: 'https://carthworks.dev/kt_logo_github_sized.png',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chennai',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'India'
        }
    };

    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ThemeProvider>
                    <Nav />
                    <ThemeSelector />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
