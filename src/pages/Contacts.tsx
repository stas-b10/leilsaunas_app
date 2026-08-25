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
import type { contact_categories } from "../utils/types/contact_categories";
import { TiLocation } from "react-icons/ti";
import type { countries } from "../utils/types/all_countries";
import { FaCheck } from "react-icons/fa";

export default function Contacts() {
  const [members, setMembers] = useState<team_members[]>([]);
    const [categories, setCategories] = useState<team_category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [countries, setCountries] = useState<countries[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [contactCategories, setContactCategories] = useState<contact_categories[]>([]);
    const [activeContactCategory, setActiveContactCategory] = useState<string | null>(null);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    privacy_policy_accepted: false,
    newsletter_consent: false,
  });

  const [resellerForm, setResellerForm] = useState({
    country_id: "",
    name: "",
    company_name: "",
    phone_number: "",
    email: "",
    message: "",
    privacy_policy_accepted: false,
    newsletter_consent: false,
  });

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

      const fetchContactCategories = async () => {
      const { data, error } = await supabase.from("contact_categories").select("*").order("display_order", { ascending: true });
      if (error) {
        console.error("Error fetching Contact categories:", error);
      } else {
        setContactCategories(data);
        if (data.length > 0 && !activeContactCategory) {
          setActiveContactCategory(data[0].id);
        }
      }
    };

    const fetchCountries = async () => {
      const { data, error } = await supabase
      .from("all_countries")
      .select("*")
      .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching countries:", error);
      } else {
        setCountries(data);
      }
    };

      fetchMembers();
      fetchCategories();
      fetchContactCategories();
      fetchCountries();
    }, []);


  const [errors, setErrors] = useState({name: false,email: false, message: false,privacy: false,company_name: false,});

    const selectedCategory = categories.find((category) => category.id === activeCategory);
    const filteredMembers = members.filter((member) => member.category_id === activeCategory);
    const useSlider = filteredMembers.length >= 5;
    const selectedContactCategory = contactCategories.find((contactCategory) =>contactCategory.id === activeContactCategory)

    const handleSubmit = async () => {
      const newErrors = {
        name: !resellerForm.name.trim(),
        email: !resellerForm.email.trim(),
        message: !resellerForm.message.trim(),
        privacy: !resellerForm.privacy_policy_accepted,
        company_name: !resellerForm.company_name.trim(),
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some(Boolean)) {
        return;
      }

      setIsSubmitting(true);

      const { error } = await supabase
        .from("become_reseller")
        .insert({
          country_id: resellerForm.country_id || null,
          name: resellerForm.name.trim(),
          company_name: resellerForm.company_name.trim(),
          phone_number: resellerForm.phone_number.trim() || null,
          email: resellerForm.email.trim(),
          message: resellerForm.message.trim(),
          privacy_policy_accepted: resellerForm.privacy_policy_accepted,
          newsletter_consent: resellerForm.newsletter_consent,
        });

      setIsSubmitting(false);

      if (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
        return;
      }

      alert("Your request has been sent successfully!");

      setResellerForm({
        country_id: "",
        name: "",
        company_name: "",
        phone_number: "",
        email: "",
        message: "",
        privacy_policy_accepted: false,
        newsletter_consent: false,
      });
    };

    const handleContactSubmit = async () => {
      const newErrors = {
        name: !contactForm.name.trim(),
        email: !contactForm.email.trim(),
        message: !contactForm.message.trim(),
        privacy: !contactForm.privacy_policy_accepted,
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some(Boolean)) {
        return;
      }

      setIsSubmitting(true);

      const { error } = await supabase
        .from("contact_us")
        .insert({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim(),
          privacy_policy_accepted: contactForm.privacy_policy_accepted,
          newsletter_consent: contactForm.newsletter_consent,
        });

      setIsSubmitting(false);

      if (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
        return;
      }

      alert("Your request has been sent successfully!");

      setContactForm({
        name: "",
        email: "",
        message: "",
        privacy_policy_accepted: false,
        newsletter_consent: false,
      });
    };

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

      <section id="team" className="bg-[#313b2a] px-[240px] py-[80px] pt-10">
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
          <div className="grid grid-cols-[180px_180px_180px] gap-x-2 px-8">
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Legal Name</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Leil Saunas OÜ</span>          
          </p>
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Reg Info</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>17195841</span>          
          </p>
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>VAT ID</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>EE102839182s</span>          
          </p>
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Legal Name</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Saunasell OÜ</span>          
          </p>
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>Reg Info</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>11889519</span>          
          </p>
          <p className="mb-6">
            <span className="block text-white text-[20px]" style={{ fontFamily: "noah-bold, sans-serif" }}>VAT ID</span>
            <span className="block text-[#C6C0AF] text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>EE101347167</span>          
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

    <section className="bg-[#F7F5EF] px-[240px] py-[120px] pt-10 ">
      <h2 className="text-[44px] text-[#313C2B] text-center pt-[55px] pb-[15px]" style={{ fontFamily: "sogo-light, sans-serif" }}>Contact us or become a reseller</h2>

      <div className="bg-[#EDE9DF] rounded-[8px] p-[8px] w-fit mx-auto mb-[100px]">
            <div className="flex justify-center">
                {contactCategories.map((contactCategory) => (
                    <button
                        key={contactCategory.id}
                        onClick={() => setActiveContactCategory(contactCategory.id)}
                        className={`cursor-pointer w-[140px] py-2 border-y border-l border-[#C6C0AF] first:rounded-l-lg last:border-r last:rounded-r-lg ${activeContactCategory === contactCategory.id ? "bg-[#313C2B] text-[#F7F5F0]" : "bg-[#F7F5F0] text-[#313C2B]"}`}
                        style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                        {contactCategory.name}
                    </button>
                ))}
            </div>
        </div>

      {selectedContactCategory?.slug === "become-reseller" && (
        // Become Reseller form
        <div className="max-w-[1370px] mx-auto grid grid-cols-[1.4fr_1fr] gap-3 text-left mt-[70px] items-stretch min-h-[550px]">
          <div className="bg-[#EDE9DF] rounded-[8px] p-8">
              <p className="flex items-center pt-2  ">
                <TiLocation className="text-[#778658] w-15 h-7 rotate-10" />
                <span className="text-[20px] text-[#313C2B] mt-2 -ml-2" style={{ fontFamily: "noah-bold, sans-serif" }}>Become a reseller for Leil® Saunas</span>
              </p>
              <div className="col-span-2 flex flex-col pl-[15px]">
               <label htmlFor="reseller-name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="reseller-name" type="text" value={resellerForm.name} onChange={(e) => { setResellerForm((prev) => ({...prev,name: e.target.value, })); setErrors((prev) => ({...prev,name: false,}));}} className={`w-full rounded-[6px] border ${errors.name ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="mt-4 flex flex-col pl-[15px]">
               <label htmlFor="reseller-company_name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Company name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="reseller-company_name" type="text" value={resellerForm.company_name} onChange={(e) => { setResellerForm((prev) => ({...prev,company_name: e.target.value, })); setErrors((prev) => ({...prev,company_name: false,}));}} className={`w-full rounded-[6px] border ${errors.company_name ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.company_name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="mt-4 flex flex-col pl-[15px]">
               <label htmlFor="reseller-email" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email address <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="reseller-email" type="text" value={resellerForm.email} onChange={(e) => { setResellerForm((prev) => ({...prev,email: e.target.value, })); setErrors((prev) => ({...prev,email: false,}));}} className={`w-full rounded-[6px] border ${errors.email ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.email && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="mt-4 flex flex-col pl-[15px]">
              <label htmlFor="countries" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Country
              </label>
              <select id="countries" value={resellerForm.country_id} onChange={(e) => { setResellerForm((prev) => ({...prev,country_id: e.target.value, })); }}
                     className="w-full h-[52px] rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] 
                     px-4 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200 appearance-none">
                       <option value="">Select Country</option>

                       {countries.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                        ))}
              </select>
             </div>

             <div className="mt-4 flex flex-col pl-[15px]">
              <label htmlFor="phone_number" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Phone number (for faster response on your quote)
              </label>
              <input id="phone_number" type="tel" value={resellerForm.phone_number} onChange={(e) => { setResellerForm((prev) => ({...prev,phone_number: e.target.value, }));}} className="w-full h-[52px] rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF]  px-4 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200 appearance-none" />
             </div>

             <div className="mt-4 flex flex-col pl-[15px]">
              <label htmlFor="message" className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Additional comments<span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <textarea id="message" rows={3} value={resellerForm.message} onChange={(e) => { setResellerForm((prev) => ({...prev,message: e.target.value, })); setErrors((prev) => ({...prev,message: false,}));}} className={`w-full rounded-[6px] border ${errors.message ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200`}/>
              {errors.message && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div className="mt-4 flex flex-col pl-[15px]">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={resellerForm.newsletter_consent} onChange={(e) => { setResellerForm((prev) => ({...prev,newsletter_consent: e.target.checked, })); }} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[12px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className="text-[16px] text-[#313C2B]">I would like to receive the newsletter, product updates  & offers </span>
              </label>
            </div>

            <div className="mt-4 flex flex-col pl-[15px]">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={resellerForm.privacy_policy_accepted} onChange={(e) => { setResellerForm((prev) => ({...prev,privacy_policy_accepted: e.target.checked, })); }} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[12px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className={`text-[16px] ${errors.privacy ? "text-red-500" : "text-[#313C2B]"}`}>I have read and agree with <a href="/privacy-policy" className={`underline ${errors.privacy ? "text-red-500" : "text-[#707F4F]"}`} >Privacy Policy *</a></span>
              </label>
              {errors.privacy && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div className="mt-4 flex flex-col pl-[15px]">
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ fontFamily: "noah-bold, sans-serif" }} className="w-full h-[42px] rounded-[6px] border border-[#C6C0AF] bg-[#313B2A] cursor-pointer px-4 outline-none text-white focus:border-gray-500 focus:bg-white transition-all duration-200">
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="relative h-[650px] min-w-[650px]">
                {selectedContactCategory?.image_url && (
                    <img src={selectedContactCategory.image_url} alt={selectedContactCategory.name} className="absolute inset-0 w-full h-full object-cover rounded-[10px_10px_220px_10px]" />
                )}
            </div>
        </div>
      )}


      {selectedContactCategory?.slug === "contact-us" && (
        // Contact Us form
        <div className="max-w-[1400px] mx-auto grid grid-cols-[1.4fr_1fr] gap-3 text-left mt-[70px] items-stretch min-h-[550px]">
          <div className="bg-[#EDE9DF] rounded-[8px] p-8">
             <p className="flex items-center pt-2 ml-2">
                <span className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Contact Us</span>
             </p>
              
              <div className="col-span-2 flex flex-col pl-[8px] pt-2">
               <label htmlFor="contact-name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="contact-name" type="text" value={contactForm.name} onChange={(e) => { setContactForm((prev) => ({...prev,name: e.target.value, })); setErrors((prev) => ({...prev,name: false,}));}} className={`w-full rounded-[6px] border ${errors.name ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[8px] pt-5">
               <label htmlFor="contact-email" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="contact-email" type="text" value={contactForm.email} onChange={(e) => { setContactForm((prev) => ({...prev,email: e.target.value, })); setErrors((prev) => ({...prev,email: false,}));}} className={`w-full rounded-[6px] border ${errors.email ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.email && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[8px] pt-5">
              <label htmlFor="message" className="text-[20px] text-[#313C2B] mb-1" style={{ fontFamily: "noah-bold, sans-serif" }}>Your message <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <textarea id="message" rows={4} value={contactForm.message} onChange={(e) => { setContactForm((prev) => ({...prev,message: e.target.value, })); setErrors((prev) => ({...prev,message: false,}));}} className={`w-full rounded-[6px] border ${errors.message ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200`}/>
              {errors.message && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div className="mt-4 flex flex-col pl-[15px]">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={contactForm.newsletter_consent} onChange={(e) => { setContactForm((prev) => ({...prev,newsletter_consent: e.target.checked, })); }} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[12px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className="text-[16px] text-[#313C2B]">I would like to receive the newsletter, product updates  & offers </span>
              </label>
            </div>

            <div className="mt-4 flex flex-col pl-[15px]">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={contactForm.privacy_policy_accepted} onChange={(e) => { setContactForm((prev) => ({...prev,privacy_policy_accepted: e.target.checked, })); }} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[12px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className={`text-[16px] ${errors.privacy ? "text-red-500" : "text-[#313C2B]"}`}>I have read and agree with <a href="/privacy-policy" className={`underline ${errors.privacy ? "text-red-500" : "text-[#707F4F]"}`} >Privacy Policy *</a></span>
              </label>
              {errors.privacy && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div className="mt-8 flex flex-col pl-[15px]">
              <button type="button" onClick={handleContactSubmit} disabled={isSubmitting} style={{ fontFamily: "noah-bold, sans-serif" }} className="w-full h-[42px] rounded-[6px] border border-[#C6C0AF] bg-[#313B2A] cursor-pointer px-4 outline-none text-white focus:border-gray-500 focus:bg-white transition-all duration-200">
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>

          </div>
          <div className="relative min-h-[650px] min-w-[650px]">
                {selectedContactCategory?.image_url && (
                    <img src={selectedContactCategory.image_url} alt={selectedContactCategory.name} className="absolute inset-0 w-full h-full object-cover rounded-[10px_10px_220px_10px]" />
                )}
            </div>
        </div>
      )}
    </section>

    </div>
  );
}