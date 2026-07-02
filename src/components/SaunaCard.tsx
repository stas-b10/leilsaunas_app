import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { SaunaCardProps } from "../utils/types/sauna";

const SaunaCard = ({ title,slug, outside, inside, outsideClass = "", insideClass = "", }: SaunaCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - 32,
      y: e.clientY - rect.top - 32,
    });
  };
  const toggleGlobalLeafCursor = (show: boolean) => {
    const leafCursor = document.querySelector('.bg-\\[\\#707F4F\\]') as HTMLElement || 
                       document.querySelector('[style*="borderRadius"]') as HTMLElement;
    
    if (leafCursor) {
      leafCursor.style.opacity = show ? "1" : "0";
      leafCursor.style.visibility = show ? "visible" : "hidden";
      leafCursor.style.transition = "opacity 0.15s ease";
    }
  };

  useEffect(() => {
    return () => {
      toggleGlobalLeafCursor(true);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    toggleGlobalLeafCursor(false); 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    toggleGlobalLeafCursor(true); 
  };

  return (
    <Link 
      to={`/sauna-category/${slug}`}
      className="block cursor-none group relative select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={isHovered ? "hover" : "rest"}
        initial="rest"
        variants={{
          rest: { borderTopRightRadius: 16 },
          hover: { borderTopRightRadius: 170 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#EDE9DF] p-10 flex flex-col items-center min-h-[560px] rounded-xl overflow-hidden"
      >
        <h3
          className="text-[44px] mb-6 text-[#2E3A2F]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          {title}
        </h3>

        <div className="relative flex items-center justify-center w-full h-[340px]">
          <img
            src={inside}
            alt={`${title} Inside`}
            className={`h-[400px] w-[499px] object-contain ${insideClass}`}
          />

          <motion.div
            variants={{
              rest: { clipPath: "inset(0% 0% 0% 0%)" },
              hover: { clipPath: "inset(0% 0% 100% 0%)" },
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center justify-center"
          >
            <img
              src={outside}
              alt={`${title} Outside`}
              className={`h-[390px] w-full object-contain ${outsideClass}`}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={isHovered ? "hover" : "rest"}
        initial="rest"
        variants={{
          rest: { opacity: 0, scale: 0.4 },
          hover: { opacity: 1, scale: 1 },
        }}
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.1,
          opacity: { duration: 0.15 }
        }}
        className="absolute left-0 top-0 z-30 w-16 h-16 bg-[#F7F5F0] rounded-full flex items-center justify-center shadow-md text-[#2E3A2F] pointer-events-none will-change-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </motion.div>
    </Link>
  );
};

export default SaunaCard;