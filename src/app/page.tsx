import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/layout/mobile-cta";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { GrainOverlay } from "@/components/backgrounds/grain-overlay";
import { SkillMatchProvider } from "@/components/skills/skill-match-context";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { LatestWriting } from "@/components/sections/latest-writing";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <SkillMatchProvider>
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <LatestWriting />
        <Education />
        <Contact />
      </main>
      <Footer />
      {/* Room for the mobile action bar so it never covers the footer. */}
      <div className="h-20 lg:hidden" aria-hidden />
      <MobileCta />
    </SkillMatchProvider>
  );
}
