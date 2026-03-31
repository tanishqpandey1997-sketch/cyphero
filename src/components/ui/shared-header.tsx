import { useNavigate } from "react-router-dom";
import { UserMenu } from "@/components/ui/user-menu";
import { LimelightNav } from "@/components/ui/limelight-nav";
import React from 'react';

interface SharedHeaderProps {
  activeIndex: number;
  children?: React.ReactNode;
}

export function SharedHeader({ activeIndex, children }: SharedHeaderProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'overview', label: 'Overview', onClick: () => navigate('/dashboard') },
    { id: 'about-us', label: 'About Us', onClick: () => navigate('/about') },
    { id: 'discover', label: 'Discover', onClick: () => navigate('/discover') },
    { id: 'open-mics', label: 'Open Mics', onClick: () => navigate('/open-mics') },
    { id: 'communities', label: 'Communities', onClick: () => navigate('/communities') },
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

       {/* User Profile */}
       <div className="flex items-center gap-4">
          <UserMenu />
       </div>
    </header>
  );
}
