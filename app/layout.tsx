import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";
import Nav from "@/components/Nav";

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
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://carthworks.dev",
        title: "Karthikeyan T - Senior AI Engineer & SaaS Architect",
        description: "Senior AI Engineer, LLM Engineer, and SaaS Architect with 20+ years of engineering experience",
        siteName: "Karthikeyan T Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Karthikeyan T - Senior AI Engineer & SaaS Architect",
        description: "Senior AI Engineer, LLM Engineer, and SaaS Architect with 20+ years of engineering experience",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">
                <ThemeProvider>
                    <Nav />
                    <ThemeSelector />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
