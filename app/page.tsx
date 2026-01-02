import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Timeline } from '@/components/Timeline';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { TechStack } from '@/components/TechStack';

import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <ScrollProgress />
      <Navbar />
      <div className="w-full">
        <Hero />
        <TechStack />
        <Projects />
        <Timeline />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
