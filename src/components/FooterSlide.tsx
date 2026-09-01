import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { GoArrowSwitch } from "react-icons/go";

import "swiper/css";

import { supabase } from "../utils/supabase";
import type { FooterSlides } from "../utils/types/footer_slides";
import LeafIcon from "./LeafIcon";

export default function FooterSlide() {
  const [slides, setSlides] = useState<FooterSlides[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
  setMousePos({
    x: e.clientX - 24,
    y: e.clientY - 24,
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
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("footer_slides")
        .select("*")
        .order("sort_order");
      if (error) {
        console.error("Error fetching footer slides:", error);
        return;
      }
      if (data) {
        setSlides(data);
      }
    };

    fetchSlides();
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    toggleGlobalLeafCursor(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    toggleGlobalLeafCursor(true);
  };

  const [trackProgress, setTrackProgress] = useState({ x: 0, width: 0 });

  const handleProgress = (swiper: SwiperType) => {
    if (!slides.length) return;

    const clamped = Math.max(0, Math.min(1, swiper.progress));
    const trackEl = containerRef.current?.querySelector(".indicator-track");
    const trackWidth = trackEl ? (trackEl as HTMLElement).clientWidth : 520;
    const width = trackWidth / slides.length;
    const x = clamped * (trackWidth - width);

    setTrackProgress({ x, width });
  };

  return (
    <section className="bg-[#2b3527] text-[#f7f5f0] py-26 px-8 relative overflow-hidden select-none">
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
          fixed
          top-0
          left-0
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

      <div className="max-w-7xl ml-[240px] mb-8 flex items-center gap-2 text-white text-[16px] font-medium tracking-wide">
        <LeafIcon className="w-[12px] h-[12px]" />
        <p style={{ fontFamily: "noah-bold, sans-serif" }}>
          they chose Leil® Saunas.
        </p>
      </div>

      <div className="w-[75%] mx-auto">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={24}
          speed={1300}
          onSwiper={handleProgress}
          onProgress={handleProgress}
          onSlideChange={(swiper) => {
            handleProgress(swiper);
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{ 0: { slidesPerView: 1.5, }, 640: { slidesPerView: 1.5, }, 1024: { slidesPerView: 1.5, }, }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-[#4f5f42] rounded-lg h-[340px] flex overflow-hidden relative p-8 cursor-none">
                <div className="w-1/2 flex flex-col justify-start z-10 pr-6">
                  <div className="flex items-center gap-4">
                    {slide.image_url ? (
                      <img
                        src={slide.image_url}
                        alt={slide.full_name}
                        className="w-16 h-16 rounded-full object-cover border border-[#55644b]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#55644b] flex items-center justify-center text-white font-bold">
                        {slide.full_name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-[26px] font-bold tracking-tight text-white" style={{ fontFamily: "noah-bold, sans-serif" }}>
                        {slide.full_name}
                      </h3>
                      <p className="text-white text-[20px] " style={{ fontFamily: "noah-regular, sans-serif" }}>
                        {slide.profession}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 absolute right-0 top-0 bottom-0 overflow-hidden rounded-tl-[240px]">
                  {slide.image_sauna && (
                    <img
                      src={slide.image_sauna}
                      alt={`${slide.full_name} sauna`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="indicator-track relative w-[40%] max-w-[520px] h-[4px] rounded-full bg-black/20 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-[#778658]"
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
      </div>
    </section>
  );
}