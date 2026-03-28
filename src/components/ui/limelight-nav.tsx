import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

export type NavItem = {
  id: string | number;
  icon?: React.ReactElement; // Made icon optional to support text-only navs exactly like screenshot
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About Us' },
  { id: 'discover', label: 'Discover' },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-white shadow-xl ${className}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-1 sm:px-2 ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label || 'Navigation Tab'}
          >
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-white/20' : 'hover:bg-white/10'
            }`}>
                {icon && cloneElement(icon as React.ReactElement<{ className?: string }>, {
                  className: `w-4 h-4 transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'opacity-60'
                  } ${(icon as React.ReactElement<{ className?: string }>).props.className || ''} ${iconClassName || ''}`,
                })}
                {label && (
                   <span className={`text-[13px] font-semibold transition-all duration-300 tracking-wide whitespace-nowrap ${
                     activeIndex === index ? 'text-white' : 'text-white/60'
                   }`}>
                     {label}
                   </span>
                )}
            </div>
          </a>
      ))}

      {/* The Glow at the top */}
      <div 
        ref={limelightRef}
        className={`absolute top-[1px] z-10 w-8 sm:w-10 h-[2px] rounded-full bg-white shadow-[0_5px_15px_rgba(255,255,255,1)] ${
          isReady ? 'transition-[left] duration-500 ease-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[2px] w-[160%] h-10 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
