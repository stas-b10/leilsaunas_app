import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { supabase } from "../utils/supabase";
import type { Ambassador } from "../utils/types/ambasadors";

export default function AmbassadorSlider() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    getAmbassadors();
  }, []);

  async function getAmbassadors() {
    const { data, error } = await supabase
      .from("ambassadors")
      .select("*")
      .order("sort_order");

    if (!error && data) {
      setAmbassadors(data);
    }
  }

  return (
    <section className="bg-[#ECE8DF] py-[90px] overflow-hidden">
      <Swiper
        slidesPerView={2.8}
        spaceBetween={140}
        grabCursor
        speed={1500} 
        touchReleaseOnEdges={true}
        resistanceRatio={0.5}
      >
        {ambassadors.map((ambassador, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <SwiperSlide key={ambassador.id}>
              <div 
                className="flex items-center gap-8 cursor-pointer select-none"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="w-[260px] h-[260px] overflow-hidden shrink-0 will-change-[border-radius] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    borderRadius: isHovered
                      ? "100% 100% 10% 100% / 100% 100% 10% 100%"
                      : "100% 10% 100% 100% / 100% 10% 100% 100%",
                  }}
                >
                  <img
                    src={ambassador.image_url}
                    alt={ambassador.full_name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: isHovered ? "scale(1.08)" : "scale(1)"
                    }}
                  />
                </div>

                <div>
                  <h3
                    className="text-[26px] text-[#313C2B]"
                    style={{
                      fontFamily: "noah-bold, sans-serif",
                    }}
                  >
                    {ambassador.full_name}
                  </h3>

                  <p
                    className="text-[20px] text-[#313C2B]"
                    style={{
                      fontFamily: "noah-regular, sans-serif",
                    }}
                  >
                    {ambassador.profession}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}