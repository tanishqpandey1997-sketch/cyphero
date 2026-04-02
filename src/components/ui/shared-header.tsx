import { useNavigate } from "react-router-dom";
import { UserMenu } from "@/components/ui/user-menu";
import { LimelightNav } from "@/components/ui/limelight-nav";
import React from 'react';
import { Bot } from "lucide-react";
import { useCypherBot } from "@/context/CypherBotContext";

interface SharedHeaderProps {
  activeIndex: number;
  children?: React.ReactNode;
}

export function SharedHeader({ activeIndex, children }: SharedHeaderProps) {
  const navigate = useNavigate();
  const { toggleBot } = useCypherBot();

  const navItems = [
    { id: 'overview', label: 'Overview', onClick: () => navigate('/dashboard') },
    { id: 'about-us', label: 'About Us', onClick: () => navigate('/about') },
    { id: 'discover', label: 'Discover', onClick: () => navigate('/discover') },
    { id: 'open-mics', label: 'Open Mics', onClick: () => navigate('/open-mics') },
    { id: 'communities', label: 'Communities', onClick: () => navigate('/communities') },
    { id: 'beat-market', label: 'Beat Market', onClick: () => navigate('/beat-market') },
  ];

  return (
    <header className="w-full mx-auto px-6 md:px-12 py-5 flex justify-between items-center z-50 fixed top-0 left-0 right-0 gap-4 transition-all duration-300">
       {/* Logo */}
       <div className="flex items-center">
           <img 
               src="/cypherlogo 1.svg" 
               alt="Cypher Connect" 
               className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale brightness-[5] contrast-[1.2] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all cursor-pointer hover:scale-105" 
               onClick={() => navigate('/dashboard')}
           />
       </div>
       
       {/* Center Section: Search (optional) + Nav */}
       <div className="hidden lg:flex items-center justify-center flex-1 gap-8">
          {children}
          <LimelightNav items={navItems} defaultActiveIndex={activeIndex} />
       </div>

       {/* User Profile + AI Bot */}
       <div className="flex items-center gap-4">
          <button 
            onClick={toggleBot}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all group"
            title="CypherBot AI"
          >
            <Bot size={18} className="group-hover:rotate-12 transition-transform" />
          </button>
          <UserMenu />
       </div>
    </header>
  );
}
