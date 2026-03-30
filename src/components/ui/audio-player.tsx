"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number = 0) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

const AudioPlayer = ({
  src,
  cover,
  title,
}: {
  src: string;
  cover?: string;
  title?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isFinite(progress) ? progress : 0);
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const time = (value / 100) * audioRef.current.duration;
      if (isFinite(time)) {
        audioRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  if (!src) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl p-6 transition-all duration-500"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: "circOut" }}
      >
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          src={src}
          className="hidden"
        />

        <div className="w-full max-w-[280px] space-y-6">
          {/* Minimal Info */}
          <div className="text-center space-y-1">
            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white font-black text-xl tracking-tighter uppercase italic leading-tight"
            >
              {title}
            </motion.h3>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Now Playing</p>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <CustomSlider
              value={progress}
              onChange={handleSeek}
              className="w-full bg-white/10"
            />
            <div className="flex items-center justify-between px-1">
              <span className="text-white/30 text-[10px] font-mono font-bold tracking-widest">
                {formatTime(currentTime)}
              </span>
              <div className="h-[1px] flex-1 mx-4 bg-white/5" />
              <span className="text-white/30 text-[10px] font-mono font-bold tracking-widest">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Premium Controls Dock */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-3xl p-3 px-5 backdrop-blur-md shadow-2xl">
            <button
              onClick={(e) => { e.stopPropagation(); handleShuffle(); }}
              className={cn("transition-colors", isShuffle ? "text-white" : "text-white/30 hover:text-white/60")}
            >
              <Shuffle size={18} />
            </button>
            
            <button className="text-white/30 hover:text-white/60 transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </motion.button>

            <button className="text-white/30 hover:text-white/60 transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleRepeat(); }}
              className={cn("transition-colors", isRepeat ? "text-white" : "text-white/30 hover:text-white/60")}
            >
              <Repeat size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayer;
