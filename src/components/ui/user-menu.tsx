import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Album, 
  ListMusic, 
  Users, 
  Globe, 
  Heart, 
  History, 
  Settings, 
  LogOut, 
  HelpCircle, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  onClick?: () => void;
}

interface MenuSection {
  items: MenuItem[];
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuSections: MenuSection[] = [
    {
      items: [
        { id: 'projects', label: 'Projects', icon: Music },
        { id: 'albums', label: 'Albums', icon: Album },
        { id: 'playlists', label: 'Playlists', icon: ListMusic },
        { id: 'bands', label: 'Bands', icon: Users },
        { id: 'communities', label: 'Communities', icon: Globe, onClick: () => navigate('/communities') },
      ]
    },
    {
      items: [
        { id: 'liked-posts', label: 'Liked Posts', icon: Heart },
        { id: 'liked-albums', label: 'Liked Albums', icon: Album },
        { id: 'liked-playlists', label: 'Liked Playlists', icon: ListMusic },
        { id: 'playback-history', label: 'Playback History', icon: History },
      ]
    },
    {
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'logout', label: 'Log out', icon: LogOut },
      ]
    },
    {
      items: [
        { id: 'help', label: 'Help', icon: HelpCircle },
        { id: 'report', label: 'Report a Problem', icon: AlertCircle },
      ]
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-md overflow-hidden group focus:outline-none"
      >
        <img 
          src="/travis-scott.jpg" 
          alt="User Profile" 
          className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 transition-all duration-300 scale-110"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-4 w-72 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[100]"
          >
            <div 
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="p-5 flex items-center gap-4 bg-white/[0.02] border-b border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
               <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src="/travis-scott.jpg" alt="Profile" className="w-full h-full object-cover grayscale brightness-110" />
               </div>
               <div className="flex-1">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">Tanishq Pandey</h3>
                  <p className="text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase group-hover:text-white transition-colors">View Profile</p>
               </div>
               <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </div>

            <div className="py-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {menuSections.map((section, sectorIndex) => (
                <React.Fragment key={sectorIndex}>
                  <div className="px-2">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          item.onClick && item.onClick();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                      >
                        <item.icon className="w-[18px] h-[18px] text-zinc-500 group-hover:text-white transition-colors" />
                        <span className="text-[13px] font-medium text-zinc-400 tracking-wide group-hover:text-white/90 transition-colors uppercase">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {sectorIndex < menuSections.length - 1 && (
                    <div className="my-2 border-t border-white/5 mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
