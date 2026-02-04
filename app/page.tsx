import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </main>
    );
}
