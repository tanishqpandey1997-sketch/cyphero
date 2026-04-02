import { SharedHeader } from "@/components/ui/shared-header";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ShoppingCart, Repeat, Download, Heart, Share2, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

function BeatCard({ beat, mode }: { beat: any, mode: 'barter' | 'paid' | 'free' }) {
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative p-4 bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 z-10 rounded-[32px] pointer-events-none" />
            
            <div className="relative h-48 w-full rounded-[24px] overflow-hidden mb-4">
                <img src={beat.image} alt={beat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl">
                        <Play fill="black" size={20} className="ml-1 text-black" />
                    </div>
                </div>
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{beat.type}</span>
                </div>
            </div>

            <div className="relative z-20 px-2 space-y-1">
                <h3 className="text-lg font-black uppercase tracking-tighter truncate">{beat.title}</h3>
                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">{beat.artist}</p>
            </div>

            <div className="relative z-20 mt-6 pt-4 border-t border-white/5 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                        <Heart size={16} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>

                {mode === 'barter' && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all text-[10px] font-black uppercase tracking-widest">
                        <Repeat size={14} /> Collab
                    </button>
                )}
                {mode === 'paid' && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-full transition-all text-[10px] font-black uppercase tracking-widest">
                        <ShoppingCart size={14} /> {beat.price || '$29.99'}
                    </button>
                )}
                {mode === 'free' && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all text-[10px] font-black uppercase tracking-widest">
                        <Download size={14} /> Download
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export function BeatMarketPage() {
    const [beats, setBeats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, "beats"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const beatsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBeats(beatsData);
            setLoading(false);

            if (beatsData.length === 0) {
                seedBeats();
            }
        });
        return unsubscribe;
    }, []);

    const seedBeats = async () => {
        const beatsRef = collection(db, "beats");
        const existing = await getDocs(beatsRef);
        if (existing.empty) {
            const initialBeats = [
                { title: 'Midnight Drive', artist: 'Prod. Jax', type: 'Lo-Fi Trap', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop', mode: 'barter' },
                { title: 'Golden Hour', artist: 'King Beats', type: 'R&B / Soul', price: '$29.99', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2938&auto=format&fit=crop', mode: 'paid' },
                { title: 'Cloud Surfing', artist: 'Lo-Fi Girl', type: 'Chillhop', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2940&auto=format&fit=crop', mode: 'free' },
            ];
            for (const b of initialBeats) {
                await addDoc(beatsRef, { ...b, createdAt: serverTimestamp() });
            }
        }
    };

    const barterBeats = useMemo(() => beats.filter(b => b.mode === 'barter'), [beats]);
    const paidBeats = useMemo(() => beats.filter(b => b.mode === 'paid'), [beats]);
    const freeBeats = useMemo(() => beats.filter(b => b.mode === 'free'), [beats]);

    const handleListBeat = async () => {
        if (!user) return;
        try {
            await addDoc(collection(db, "beats"), {
                title: 'New Heat',
                artist: user.displayName || 'Unnamed Artist',
                type: 'Experimental',
                image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2940&auto=format&fit=crop',
                mode: 'barter',
                createdAt: serverTimestamp()
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">
            <SharedHeader activeIndex={5} />

            <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24 space-y-24">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6 max-w-xl text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                            Beat <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-700">Market</span>
                        </h1>
                        <p className="text-sm md:text-base text-zinc-400 tracking-wide leading-relaxed">
                            Discover premium beats, collaborate through barter systems, or grab instrumentals tailored for your next hit.
                        </p>
                    </motion.div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleListBeat}
                        className="px-10 py-5 rounded-[32px] bg-white text-black font-black uppercase text-xs tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-4 group"
                    >
                        <Plus size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                        List Your Beat
                    </motion.button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em]">Syncing Marketplace...</span>
                    </div>
                ) : (
                    <div className="space-y-32">
                        {/* Barter Collabs */}
                        <section className="space-y-12">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Repeat size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">Barter Collabs</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {barterBeats.map(beat => (
                                        <BeatCard key={beat.id} beat={beat} mode="barter" />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>

                        {/* Paid Beats */}
                        <section className="space-y-12">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <ShoppingCart size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">Premium Beats</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {paidBeats.map(beat => (
                                        <BeatCard key={beat.id} beat={beat} mode="paid" />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>

                        {/* Free Beats */}
                        <section className="space-y-12">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Download size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">Free Downloads</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {freeBeats.map(beat => (
                                        <BeatCard key={beat.id} beat={beat} mode="free" />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    </div>
                )}

            </main>
        </div>
    );
}
