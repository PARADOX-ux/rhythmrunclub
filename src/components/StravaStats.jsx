import { motion } from 'framer-motion'
import { Activity, Zap, Users, Trophy } from 'lucide-react'

const stats = [
    { label: "Club Members", value: "1,240", icon: Users },
    { label: "Total Km Run", value: "85k+", icon: Activity },
    { label: "Avg Pace", value: "6:30", icon: Zap },
    { label: "PRs This Month", value: "48", icon: Trophy },
]

export default function StravaStats() {
    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-20">
            <div className="bg-[#FC4C02]/10 border border-[#FC4C02]/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Strava Branding */}
                <div className="absolute top-6 right-6 opacity-80">
                    {/* Simple text logo replacement since we don't have SVG handy */}
                    <span className="font-bold tracking-tighter text-[#FC4C02]">STRAVA</span>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Left: Call to Action */}
                    <div className="text-center md:text-left space-y-6 flex-1 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white">
                            PROOF OF <span className="text-[#FC4C02]">WORK.</span>
                        </h2>
                        <p className="text-zinc-400 max-w-md">
                            We don't just talk. We run. Join our Strava club to track your progress and hype up the squad.
                        </p>
                        <a
                            href="https://www.strava.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#FC4C02] text-white font-bold py-3 px-8 rounded-full hover:bg-[#e34402] transition-colors"
                        >
                            JOIN ON STRAVA
                        </a>
                    </div>

                    {/* Right: Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 min-w-[140px]"
                            >
                                <stat.icon className="w-6 h-6 text-[#FC4C02] mb-3" />
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background Decorative Map Graphic (Abstract) */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 L20 80 L40 90 L60 50 L80 60 L100 20" stroke="#FC4C02" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                    <path d="M0 80 L30 50 L50 70 L80 30 L100 50" stroke="#FC4C02" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>
        </section>
    )
}
