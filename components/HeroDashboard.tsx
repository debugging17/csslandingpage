"use client";

import { motion } from "motion/react";
import { Activity, BarChart3, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

const WindowFrame = ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="relative h-full bg-[#0F1117]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Window Header */}
        <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            {title && <div className="ml-4 text-[10px] font-mono text-gray-400 opacity-60">{title}</div>}
        </div>
        {/* Window Content */}
        <div className="flex-1 overflow-hidden relative">
            {children}
        </div>
    </div>
);

const CodeSnippet = () => {
    return (
        <div className="font-mono text-[10px] sm:text-xs leading-relaxed text-blue-100/80 p-4 sm:p-6 overflow-hidden h-full bg-[#0F1117]">
            <div className="space-y-1">
                <p><span className="text-purple-400">const</span> <span className="text-blue-300">Dashboard</span> <span className="text-purple-400">=</span> <span className="text-purple-400">async</span> () <span className="text-purple-400">=&gt;</span> {"{"}</p>
                <br />
                <p><span className="text-purple-400">const</span> {"{"} <span className="text-blue-300">data</span>, <span className="text-blue-300">error</span> {"}"} <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-300">supabase</span></p>
                <p className="pl-4">.<span className="text-blue-300">from</span>(<span className="text-green-300">'revenue_metrics'</span>)</p>
                <p className="pl-4">.<span className="text-blue-300">select</span>(<span className="text-green-300">'*'</span>)</p>
                <p className="pl-4">.<span className="text-blue-300">single</span>();</p>
                <br />
                <p><span className="text-purple-400">if</span> (<span className="text-blue-300">error</span>) <span className="text-purple-400">throw new</span> <span className="text-yellow-300">Error</span>(<span className="text-blue-300">error</span>.message);</p>
                <br />
                <p><span className="text-purple-400">return</span> (</p>
                <br />
                <p className="pl-4">&lt;<span className="text-blue-300">AnalyticsGrid</span>&gt;</p>
                <br />
                <p className="pl-4">&lt;<span className="text-blue-300">RevenueCard</span> <span className="text-blue-300">value</span>={"{"}<span className="text-blue-300">data</span>.amount{"}"} /&gt;</p>
                <br />
                <p className="pl-4">&lt;<span className="text-blue-300">TeamPerformance</span> <span className="text-blue-300">team</span>={"{"}<span className="text-blue-300">data</span>.team{"}"} /&gt;</p>
                <br />
                <p className="pl-4">&lt;/<span className="text-blue-300">AnalyticsGrid</span>&gt;</p>
                <br />
                <p>);</p>
                <p>{"}"};</p>
            </div>
        </div>
    );
};

const DashboardPreview = () => {
    return (
        <div className="flex h-full w-full bg-[#0F1117] text-white font-sans text-[10px] sm:text-xs">
            {/* Sidebar */}
            <div className="w-10 sm:w-12 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-white/[0.02]">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">C</div>
                <div className="flex flex-col gap-3 mt-4">
                    <div className="p-1.5 rounded-md bg-white/10 text-white"><Activity size={14} /></div>
                    <div className="p-1.5 rounded-md text-gray-500 hover:text-white transition-colors"><BarChart3 size={14} /></div>
                    <div className="p-1.5 rounded-md text-gray-500 hover:text-white transition-colors"><Users size={14} /></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-200">Key Metrics</h3>
                    <span className="text-gray-500 text-[9px]">September 2024</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
                    {/* Revenue Card */}
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-400">Actual Revenue</span>
                                <span className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded text-[9px] font-medium">+26.5%</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-white mb-1">$319,835</div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[70%] rounded-full" />
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-400">Run Rate</span>
                                <span className="text-emerald-400 text-[9px]">+17.7%</span>
                            </div>
                            <div className="text-lg font-semibold">56.26%</div>
                        </div>
                    </div>

                    {/* Team Performance */}
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-300 font-medium">Team Performance</span>
                            <MoreHorizontal size={12} className="text-gray-500" />
                        </div>
                        <div className="space-y-2.5 flex-1 overflow-hidden">
                            {[
                                { name: "Emily Johnson", rev: "$38,434", rate: "88.9%", score: "8.1" },
                                { name: "James Wilson", rev: "$35,854", rate: "63.9%", score: "7.8" },
                                { name: "David Jones", rev: "$34,454", rate: "61.9%", score: "7.9" },
                            ].map((member, i) => (
                                <div key={i} className="flex items-center justify-between text-[9px] sm:text-[10px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                                        <span className="text-gray-300">{member.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <span>{member.rev}</span>
                                        <span className="text-emerald-400 bg-emerald-400/10 px-1 rounded">{member.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HeroDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4"
        >
            {/* Left Column: Code Window */}
            <div className="relative group h-[300px] sm:h-[400px]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <WindowFrame title="backend.tsx">
                    <CodeSnippet />
                </WindowFrame>
            </div>

            {/* Right Column: Preview Window */}
            <div className="relative group h-[300px] sm:h-[400px]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <WindowFrame title="dashboard_preview">
                    <DashboardPreview />
                </WindowFrame>
            </div>
        </motion.div>
    );
}
