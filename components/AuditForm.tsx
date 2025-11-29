"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    platform: z.enum(["shopify", "custom", "other"]),
});

type FormData = z.infer<typeof formSchema>;

export default function AuditForm() {
    const [step, setStep] = useState<"email" | "platform" | "auditing" | "success">("email");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const handleEmailSubmit = async () => {
        const isValid = await trigger("email");
        if (isValid) {
            setStep("platform");
        }
    };

    const onSubmit = async (data: FormData) => {
        setStep("auditing");
        setLoading(true);

        // Simulate auditing process
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
            // Attempt to save to Supabase (will fail without credentials, but we catch it)
            await supabase.from("leads").insert([
                {
                    email: data.email,
                    platform: data.platform,
                    created_at: new Date().toISOString(),
                },
            ]);
        } catch (error) {
            console.warn("Supabase save failed (expected without credentials):", error);
        }

        setLoading(false);
        setStep("success");
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl backdrop-blur-md bg-midnight/80 border border-white/10 shadow-2xl">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold font-sans text-white mb-2">
                    {step === "success" ? "Audit Complete" : "Initialize System Audit"}
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                    {step === "email" && "Step 1: Identity Verification"}
                    {step === "platform" && "Step 2: Architecture Analysis"}
                    {step === "auditing" && "Running Diagnostics..."}
                    {step === "success" && "Report Generated"}
                </p>
            </div>

            {step === "email" && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-mono text-primary mb-2">Email Address</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="dev@company.com"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.email && (
                            <p className="text-danger-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <button
                        onClick={handleEmailSubmit}
                        className="w-full py-4 rounded-lg bg-primary text-white font-bold font-mono hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        PROCEED <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {step === "platform" && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                        <label className="block text-sm font-mono text-accent mb-2">Current Architecture</label>

                        {["shopify", "custom", "other"].map((platform) => (
                            <label
                                key={platform}
                                className="flex items-center p-4 rounded-lg border border-white/10 bg-black/20 cursor-pointer hover:border-accent/50 transition-all"
                            >
                                <input
                                    type="radio"
                                    value={platform}
                                    {...register("platform")}
                                    className="mr-3 text-accent focus:ring-accent"
                                />
                                <span className="capitalize text-white">{platform}</span>
                            </label>
                        ))}
                        {errors.platform && (
                            <p className="text-danger-500 text-sm mt-1">{errors.platform.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-lg bg-accent text-white font-bold font-mono hover:bg-accent/90 transition-colors"
                    >
                        RUN AUDIT
                    </button>
                </form>
            )}

            {step === "auditing" && (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary via-accent to-highlight animate-progress w-full origin-left" />
                    </div>
                    <p className="text-xs font-mono text-gray-500 animate-pulse">
                        Scanning dependencies...
                    </p>
                </div>
            )}

            {step === "success" && (
                <div className="text-center space-y-6 py-4">
                    <div className="w-20 h-20 bg-success-500/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-success-500" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-white">Your digital health score is ready.</p>
                        <p className="text-sm text-gray-400">Check your inbox for the full report.</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-primary text-sm font-mono hover:underline"
                    >
                        Run Another Audit
                    </button>
                </div>
            )}
        </div>
    );
}
