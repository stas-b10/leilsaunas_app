import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoArrowSwitch } from "react-icons/go";
import { FaFire, FaTrophy } from "react-icons/fa";

import "swiper/css";

import { supabase } from "../utils/supabase";
import type { ValueSlides } from "../utils/types/value_slides";

export default function ValueSlider() {
  const [slides, setSlides] = useState<ValueSlides[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const getSlideIcon = (index: number) => {
    return index % 2 === 0 ? <FaTrophy /> : <FaFire />;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setMousePos({
      x: e.clientX - rect.left - 32,
      y: e.clientY - rect.top - 32,
    });
  };

  const toggleGlobalLeafCursor = (show: boolean) => {
    const leafCursor =
      (document.querySelector(".bg-\\[\\#707F4F\\]") as HTMLElement) ||
      (document.querySelector('[style*="borderRadius"]') as HTMLElement);

    if (leafCursor) {
      leafCursor.style.opacity = show ? "1" : "0";
      leafCursor.style.visibility = show ? "visible" : "hidden";
      leafCursor.style.transition = "opacity 0.15s ease";
    }
  };

  useEffect(() => {
    getSlides();
    return () => toggleGlobalLeafCursor(true);
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    toggleGlobalLeafCursor(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    toggleGlobalLeafCursor(true);
  };

  async function getSlides() {
    const { data } = await supabase
      .from("value_slides")
      .select("*")
      .order("sort_order");

    if (data) setSlides(data);
  }

  const [trackProgress, setTrackProgress] = useState({ x: 0, width: 0 });

  const handleProgress = (swiper: any) => {
    if (!slides.length) return;

    const clamped = Math.max(0, Math.min(1, swiper.progress));
    const trackEl = swiper.el.querySelector(".indicator-track");
    const trackWidth = trackEl ? (trackEl as HTMLElement).clientWidth : 520;
    const width = trackWidth / slides.length;
    const x = clamped * (trackWidth - width);

    setTrackProgress({ x, width });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#F7F5F0] py-[40px] overflow-hidden relative cursor-none select-none"
    >
      <motion.div
        animate={isHovering ? "hover" : "rest"}
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
        }}
        className="
          absolute
          left-0
          top-0
          z-50
          w-12
          h-12
          rounded-full
          bg-[#F7F5F0]
          text-black
          shadow-md
          pointer-events-none
          flex items-center justify-center
          will-change-transform
        "
      >
        <GoArrowSwitch className="text-xl" />
      </motion.div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={12}
        slidesOffsetBefore={10}
        slidesOffsetAfter={-7}
        speed={1500}
        onSwiper={handleProgress}
        onProgress={handleProgress}
        onSlideChange={(swiper) => {
          handleProgress(swiper);
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide, index) => {
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[610px] overflow-hidden rounded-[12px]">
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0" />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={
                    isActive
                      ? {
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      : {
                          duration: 0, 
                        }
                  }
                  className="absolute left-[115px] top-[10%] z-10 max-w-[600px] text-white"
                >
                  <div className="mb-4 relative h-[55px] w-[55px]">
                    <motion.div
                      key={activeIndex}
                      initial={{ rotate: -20 }}
                      animate={{ rotate: 90 }}
                      transition={{
                        duration: 2.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0 bg-[#778658]"
                      style={{
                        borderRadius:
                          "100% 0% 100% 100% / 100% 0% 100% 100%",
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center text-white text-[23px]">
                      {getSlideIcon(index)}
                    </div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={
                      isActive
                        ? {
                            duration: 1,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : { duration: 0 }
                    }
                    className="mb-4 text-[26px] font-semibold"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={
                      isActive
                        ? {
                            duration: 1,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : { duration: 0 }
                    }
                    className="text-[20px] leading-[1.6] text-white"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    {slide.description}
                  </motion.p>
                </motion.div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {slides.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="indicator-track relative w-[40%] max-w-[520px] h-[4px] rounded-full bg-black/10 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-black/60"
              animate={{
                x: trackProgress.x,
                width: trackProgress.width,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 25,
                mass: 0.5,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}