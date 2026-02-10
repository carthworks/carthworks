import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Mobile: Stack vertically */}
            <div className="lg:hidden">
                <Hero />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>

            {/* Desktop: Split screen layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:h-screen lg:overflow-hidden">
                {/* Left Side - Fixed Hero (1/4 width) */}
                <div className="h-screen flex items-center border-r border-zinc-200 dark:border-zinc-800">
                    <Hero />
                </div>

                {/* Right Side - Scrollable Content (3/4 width) */}
                <div id="content-scroll" className="col-span-3 h-screen overflow-y-auto scroll-smooth">
                    <Experience />
                    <Skills />
                    <Projects />
                    <Contact />
                    <Footer />
                </div>
            </div>

            <Analytics />
        </main>
    );
}
