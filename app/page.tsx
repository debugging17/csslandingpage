import Scene from "@/components/Scene";
import HeroOverlay from "@/components/HeroOverlay";
import ScrollySection from "@/components/ScrollySection";
import AuditForm from "@/components/AuditForm";
import Header from "@/components/Header";
import LogoMarquee from "@/components/LogoMarquee";

export default function Home() {
  return (
    <main className="relative bg-midnight text-white">
      <Header />
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      <div className="relative z-10">
        {/* Hero Section - Chaos */}
        <ScrollySection mode="chaos" className="min-h-screen h-auto items-start relative z-10">
          <HeroOverlay />
        </ScrollySection>

        {/* Section 1: Dev - Drift */}
        <ScrollySection mode="drift" className="min-h-screen flex flex-col items-center justify-center bg-white text-midnight relative overflow-hidden pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,_#e5e7eb_1px,_transparent_1px)] bg-[size:4rem_4rem] opacity-[0.3]" />

          <div className="absolute top-0 left-0 w-full z-20 mt-0 transition-all duration-500">
            <LogoMarquee />
          </div>

          <div className="max-w-4xl mx-auto p-8 text-center relative z-10 mt-12">
            <h2 className="text-6xl md:text-8xl font-bold font-sans text-midnight mb-8 tracking-tight">Fragmented Code</h2>
            <p className="text-2xl md:text-3xl font-mono text-secondary leading-relaxed">
              Legacy systems drift. Dependencies rot. <br />
              <span className="text-primary font-bold">Your foundation is moving beneath your feet.</span>
            </p>
          </div>
        </ScrollySection>

        {/* Section 2: Sec - Warning */}
        <ScrollySection mode="warning" className="min-h-screen flex items-center bg-midnight text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,_#ffffff_1px,_transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05]" />
          <div className="max-w-4xl mx-auto p-8 text-center relative z-10">
            <h2 className="text-6xl md:text-8xl font-bold font-sans text-white mb-8 tracking-tight">Security Gaps</h2>
            <p className="text-2xl md:text-3xl font-mono text-gray-300 font-medium leading-relaxed">
              Chaos invites vulnerability. <br />
              <span className="text-highlight font-bold">Every unpatched gap is an open door.</span>
            </p>
          </div>
        </ScrollySection>

        {/* Section 3: UX - Drift (Return to confusion before order) */}
        <ScrollySection mode="drift" className="min-h-screen flex items-center bg-white text-midnight relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,_#e5e7eb_1px,_transparent_1px)] bg-[size:4rem_4rem] opacity-[0.3]" />
          <div className="max-w-4xl mx-auto p-8 text-center relative z-10">
            <h2 className="text-6xl md:text-8xl font-bold font-sans text-midnight mb-8 tracking-tight">Poor Experience</h2>
            <p className="text-2xl md:text-3xl font-mono text-secondary leading-relaxed">
              User trust erodes in the noise. <br />
              <span className="text-accent font-bold">Friction is the enemy of conversion.</span>
            </p>
          </div>
        </ScrollySection>

        {/* Transition to Authority - Order */}
        <ScrollySection mode="order" className="min-h-screen flex flex-col justify-center bg-midnight relative">
          <div className="max-w-7xl mx-auto p-8 text-center">
            <h2 className="text-6xl md:text-8xl font-bold font-sans text-white mb-24 tracking-tight">The Trinity</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="p-10 rounded-3xl bg-midnight/50 border border-primary/30 backdrop-blur-xl hover:border-primary hover:bg-primary/5 transition-all duration-500 group hover:-translate-y-2 shadow-2xl shadow-primary/5">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-sans tracking-wide">Dev</h3>
                <p className="text-gray-400 font-mono leading-relaxed">
                  Clean, maintainable code architecture. Modular systems that scale without technical debt.
                </p>
              </div>

              <div className="p-10 rounded-3xl bg-midnight/50 border border-accent/30 backdrop-blur-xl hover:border-accent hover:bg-accent/5 transition-all duration-500 group hover:-translate-y-2 shadow-2xl shadow-accent/5">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors border border-accent/20">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-sans tracking-wide">Sec</h3>
                <p className="text-gray-400 font-mono leading-relaxed">
                  Zero-trust security model. Automated compliance and vulnerability scanning at every step.
                </p>
              </div>

              <div className="p-10 rounded-3xl bg-midnight/50 border border-secondary/30 backdrop-blur-xl hover:border-secondary hover:bg-secondary/5 transition-all duration-500 group hover:-translate-y-2 shadow-2xl shadow-secondary/5">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors border border-secondary/20">
                  <svg className="w-10 h-10 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-sans tracking-wide">UX</h3>
                <p className="text-gray-400 font-mono leading-relaxed">
                  Frictionless user experiences. Performance-first design that converts visitors into users.
                </p>
              </div>
            </div>

            <p className="mt-24 text-primary font-mono animate-pulse tracking-[0.2em] text-sm uppercase">System Aligned</p>
          </div>
        </ScrollySection>

        {/* Lead Capture Section */}
        <div className="min-h-screen flex items-center justify-center p-8 relative z-20">
          <AuditForm />
        </div>

        <div className="h-[20vh]"></div>
      </div>
    </main>
  );
}
