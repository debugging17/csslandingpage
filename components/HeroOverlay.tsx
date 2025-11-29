import MouseEffectCard from "@/components/MouseEffectCard";
import HeroDashboard from "@/components/HeroDashboard";

export default function HeroOverlay() {
    return (
        <div className="relative w-full min-h-screen z-10 flex items-center justify-center pointer-events-none">
            <MouseEffectCard
                className="pointer-events-auto bg-midnight/40 backdrop-blur-md border-x-0 border-t-0 border-b border-white/10 w-full min-h-screen h-auto max-w-none mx-0 rounded-none"
                title="Is Your Digital Foundation Cracking?"
                titleClassName="text-5xl md:text-7xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-highlight animate-gradient-x pb-2"
                subtitle="Entropy is inevitable. Order is engineered."
                primaryCtaText="INITIATE_AUDIT"
                primaryCtaUrl="#audit"
                secondaryCtaText="EXPLORE_SYSTEM"
                secondaryCtaUrl="#system"
                footerText="System Status: ONLINE"
                dotSize={3}
                dotSpacing={24}
                repulsionRadius={120}
                repulsionStrength={30}
                dashboard={<HeroDashboard />}
            />
        </div>
    );
}
