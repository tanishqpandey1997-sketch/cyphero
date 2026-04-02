import { motion } from "framer-motion";
import { CheckCircle2, Play, Pause, Download, Star } from "lucide-react";
import { useState } from "react";

export function FeedbackCard({ data }: { data: { mix: number, master: number, lyrics: number, advice: string } }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-white/5 border border-white/10 rounded-[24px] space-y-4"
        >
            <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AI Audio Analysis</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Mix', score: data.mix, color: 'text-blue-400' },
                    { label: 'Master', score: data.master, color: 'text-purple-400' },
                    { label: 'Lyrics', score: data.lyrics, color: 'text-amber-400' },
                ].map((item) => (
                    <div key={item.label} className="text-center p-3 rounded-2xl bg-black/40 border border-white/5">
                        <span className="block text-[8px] uppercase font-black text-zinc-500 mb-1">{item.label}</span>
                        <span className={item.color + " text-lg font-black italic"}>{item.score}/10</span>
                    </div>
                ))}
            </div>

            <div className="p-3 rounded-xl bg-white/5 border-l-2 border-emerald-500/50">
                <p className="text-[11px] text-zinc-300 leading-relaxed italic">"{data.advice}"</p>
            </div>
        </motion.div>
    );
}

export function GeneratedBeatCard({ title, artist }: { title: string, artist: string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-[24px] flex items-center gap-4"
        >
            <div 
                className="w-12 h-12 rounded-xl bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-1" />}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-300">AI Generated Hook</span>
                </div>
                <h4 className="text-xs font-black uppercase tracking-tighter truncate">{title}</h4>
                <p className="text-[9px] text-zinc-500 font-bold uppercase">{artist}</p>
            </div>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Download size={14} className="text-zinc-400" />
            </button>
        </motion.div>
    );
}
