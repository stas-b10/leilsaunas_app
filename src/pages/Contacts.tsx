import ContactMain from "../assets/images/contact_main.png"
import ContactUsButton from "../components/ContactUsButton";
import LeafIcon from "../components/LeafIcon";
import WorldMap from "../components/WorldMap";
import {useEffect, useState} from "react";
import type { team_members } from "../utils/types/team_members";
import type { team_category } from "../utils/types/team_category";
import { supabase } from "../utils/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { GoArrowSwitch } from "react-icons/go";
import first_card from "../assets/images/first_card.png"
import second_card from "../assets/images/second_card.png"

export default function Contacts() {
  const [members, setMembers] = useState<team_members[]>([]);
    const [categories, setCategories] = useState<team_category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {setMousePos({x: e.clientX - 24,y: e.clientY - 24,});};
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
    const handleMouseEnter = () => {
      setIsHovering(true);
      toggleGlobalLeafCursor(false);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      toggleGlobalLeafCursor(true);
    };
    
  
    useEffect(() => {
      const fetchMembers = async () => {
        const { data, error } = await supabase.from("team_members").select("*").order("display_order", { ascending: true });
        if (error) {
          console.error("Error fetching team members:", error);
        } else {
          setMembers(data);
          if (data.length > 0) {
            setActiveCategory(data[0].category_id);
          }
        }
      };
  
      const fetchCategories = async () => {
        const { data, error } = await supabase.from("team_categories").select("*").order("display_order", { ascending: true });
        if (error) {
          console.error("Error fetching team categories:", error);
        } else {
          setCategories(data);
          if (data.length > 0 && !activeCategory) {
            setActiveCategory(data[0].id);
          }
        }
      };
  
  
      fetchMembers();
      fetchCategories();
    }, []);

    const selectedCategory = categories.find((category) => category.id === activeCategory);
    const filteredMembers = members.filter((member) => member.category_id === activeCategory);
    const useSlider = filteredMembers.length >= 5;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black">
      

        <section className="w-full mb-16">

          <div className="relative w-full h-[530px] overflow-hidden">

            <img
              src={ContactMain}
              alt={"main "}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-10 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[650px] text-[44px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Reach out.
                </p>

                <p className="w-[450px] text-[20px] leading-relaxed ">
                  <strong style={{ fontFamily: "noah-bold, sans-serif" }}>Become a reseller or contact us directly.</strong>
                  <span className="block text-[#c6c0af]" style={{ fontFamily: "noah-regular, sans-serif" }}>Scroll to view our resellers.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[100px]">
           <div className="px-[250px] mt-[100px] ">
            <div className="flex items-center gap-3 text-[#313C2B] text-[16px]">
              <LeafIcon className="w-[12px] h-[12px]" />
                  <p style={{ fontFamily: "noah-bold, sans-serif" }}>
                     bringing wellness everywhere.
                  </p>
            </div>

                  <div className="ml-[730px] -mt-[40px] flex flex-col gap-6">
                    <h2 style={{ fontFamily: "sogo-light, sans-serif" }} className="text-[44px]">Find a reseller near you</h2>
                    <p className="text-[19px] mb-2 -mt-4 text-[#313C2B]">No resellers in your country? Contact us directly!</p>
                    <ContactUsButton/>
                  </div>
            </div>
        </section>

      <section
        id="map"
        className="h-[700px] w-full bg-gray-300 flex items-center justify-center"
      >
        <WorldMap />
      </section>

      <section id="team" className="bg-[#313b2a] px-[240px] py-[730px] pt-10 ">
        <div className="grid grid-cols-2 ">
        <div className="flex items-center gap-3">
          <LeafIcon className="w-[12px] h-[12px]" />
          <span className="text-white text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }} >our team.</span>
        </div>
        <div>
          <h2 className="text-[44px] text-white pt-[40px]" style={{ fontFamily: "sogo-light, sans-serif" }}>Our Team</h2>
          <p className="text-white text-[20px] mt-4" style={{ fontFamily: "noah-regular, sans-serif" }}>Discover our exceptional range of high-quality, premium class saunas crafted by a team of experienced manufacturers.</p>
        </div>
      </div>
      <div className="rounded-[8px] p-[8px] w-fit mx-auto mt-[100px]">
            <div className="flex justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`cursor-pointer w-[90px] py-2 border-y border-l border-[#444D3D] first:rounded-l-lg last:border-r last:rounded-r-lg ${activeCategory === category.id ? "bg-[#313C2B] text-[#F7F5F0]" : "bg-[#F7F5F0] text-[#313C2B]"}`}
                        style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
      <div className="mt-[70px]">
        <h2 className="text-white text-[44px] pl-[20px]" style={{ fontFamily: "sogo-light, sans-serif" }}>{selectedCategory?.name}</h2>
        {useSlider ? (
          <div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cursor-none">
            <motion.div
            animate={isHovering ? "hover" : "rest"}
            initial="rest"
            variants={{
              rest: {
                opacity: 0,
                scale: 0.4,
              },
              hover: {
                opacity: 1,
                scale: 1,
              },
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
            className="fixed top-0 left-0 z-50 w-12 h-12 rounded-full bg-[#F7F5F0] text-black shadow-md pointer-events-none flex items-center justify-center will-change-transform"
            >
              <GoArrowSwitch className="text-xl" />
            </motion.div>
            <div className="max-w-[1500px]">
            <Swiper slidesPerView={4.30} spaceBetween={2} speed={1000} breakpoints={{ 0: { slidesPerView: 1,spaceBetween: 2,}, 640: { slidesPerView: 2,spaceBetween: 2,}, 1024: { slidesPerView: 4.15,spaceBetween: 2,},}}>
            {filteredMembers.map((member) => (
              <SwiperSlide key={member.id}>
               <div className="overflow-hidden rounded-[8px] ml-[20px] pt-4">
                <div className="w-full h-[330px] overflow-hidden rounded-[14px]">
                  <img src={member.image_url} alt={member.name} className="w-full  h-full object-cover" />
                </div>
                  <div className="pt-5">
                    <h3 className="text-white text-[26px]" style={{ fontFamily: "noah-bold, sans-serif" }}>{member.name}</h3> 
                    <div className="mt-2">
                    <p className="text-[#C6C0AF] text-[18px]" style={{ fontFamily: "noah-regular, sans-serif" }}> {member.speciality}</p>
                    <p className="text-white text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}> {member.email}</p> 
                    </div>
                  </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
            </div>
          </div>
          ) : (
            <div className="grid grid-cols-4 ">
              {filteredMembers.map((member) => (
                <div key={member.id} className="overflow-hidden rounded-[8px] ml-[20px] pt-4">
                  <div className="w-full h-[300px] overflow-hidden rounded-[14px]">
                    <img src={member.image_url} alt={member.name} className="w-full  h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white text-[26px]" style={{ fontFamily: "noah-bold, sans-serif" }}>{member.name}</h3> 
                    <div className="mt-2">
                    <p className="text-[#C6C0AF] text-[18px]" style={{ fontFamily: "noah-regular, sans-serif" }}> {member.speciality}</p>
                    <p className="text-white text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}> {member.email}</p> 
                    </div>
                  </div>
                </div>
              ))}
        </div>
          )}
      </div>

    <div className="max-w-[1500px] pt-[250px]">
      <div className="grid grid-cols-2 gap-3">
        <div className="ml-[20px] bg-[#1B2017] rounded-[10px] overflow-hidden">
          <p className="text-white text-[26px] mb-4 px-8 py-5 mt-2" style={{ fontFamily: "noah-bold, sans-serif" }}>Tartu Headquarters</p>
          <div className="grid grid-cols-2 gap-2 px-8">
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Address</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Karja tee 6, Võnnu, Kastre Parish, Tartu County, 62401 Estonia</span>          
          </p>
          <p className="ml-[60px]">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>info@leilsaunas.com</span>          
          </p>
          <p>
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Showroom opening hours</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>M-F 08:00 – 16:30</span>          
          </p>
          </div>
          <div className="px-6 pb-6 pt-8">
        <div className="h-[360px] overflow-hidden rounded-[12px]">
          <img src={first_card} alt="first_card_image" className="w-full h-full object-cover" />
          </div>
        </div>
        </div>
        <div className=" bg-[#1B2017] rounded-[14px] overflow-hidden">
          <p className="text-white text-[26px] mb-4 px-6 py-6 mt-2" style={{ fontFamily: "noah-bold, sans-serif" }}>Business info</p>
          <div className="grid grid-cols-2 gap-2 px-8">
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Legal Name</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Karja tee 6, Võnnu, Kastre Parish, Tartu County, 62401 Estonia</span>          
          </p>
          <p className="ml-[60px]">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>info@leilsaunas.com</span>          
          </p>
          <p>
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Showroom opening hours</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>M-F 08:00 – 16:30</span>          
          </p>
          </div>
          <div className="px-6 pb-6 pt-8">
        <div className="h-[360px] overflow-hidden rounded-[12px]">
          <img src={second_card} alt="first_card_image" className="w-full h-full object-cover" />
          </div>
        </div>
        </div>
      </div>
    </div>
    </section>

    </div>
  );
}