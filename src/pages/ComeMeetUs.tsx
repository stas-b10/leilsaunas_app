import comeMeetUs from "../assets/images/ComeMeetUs.png"
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import ComeMeetUsFooter from "../components/ComeMeetUsFooter";

export default function ComeMeetUs() {

   const [email, setEmail] = useState("");
    
   const handleSubscribe = async () => {
      if (!email) return;
    
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);
    
      if (!error) {
        alert("Subscribed!");
        setEmail("");
      } else {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black">
      
      <section className="w-full mb-16">
          <div className="relative w-full h-[400px] overflow-hidden">

            <img
              src={comeMeetUs}
              alt={"main_img"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-18 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[1050px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Come meet us at upcoming expos & sauna events in 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[250px]">
         <div className="mt-[100px] grid grid-cols-[1.1fr_0.9fr]">
          <div className="pl-[270px] pr-[50px] flex flex-col space-y-6">
            <h2 className="text-[20px] text-[#778658]" style={{ fontFamily: "noah-bold, sans-serif" }}>
             Published on May 7, 2026
            </h2>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Come meet us at upcoming expos & sauna events in 2026.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>🇫🇮 <strong>World Sauna Forum</strong> 9.06–11.06.26 Jyväskylä, Finland</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>🇳🇴 <strong>Sauna Congress 2026</strong> 24.09–26.09.26 Oslo, Norway</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>🇩🇪 <strong>Interbad Spa & Wellness</strong> 6.10–8.10.26 Stuttgart, Germany (Stand: 1C32)</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>🇺🇸 <strong>Pool Spa Patio Expo</strong> 17.11–19.11.26 Louisiana, United States (Stand: PSP 1st Floor Exhibit Hall, Booth 2019)</p>
            <img src={comeMeetUs} alt="comeMeetUsImg" className="w-full h-full rounded-xl" />
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Stop by to talk about design, Leil®, sauna rituals and connect with the people behind it all.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>For more information, contact us at <strong>info@leilsaunas.com</strong></p>
          </div>
        
        <div className="border-l border-[#C6C0AF] pl-[30px]">
         <div className="bg-[#1B2017] rounded-[8px] p-[30px] w-[580px] h-[230px]">
            <h3 className="mb-2 text-[20px] whitespace-nowrap text-white" style={{fontFamily: "noah-bold, sans-serif"}}>
              Subscribe to the newsletter
            </h3>

            <p className="mb-2 text-[16px] whitespace-nowrap text-[#C6C0AF]" style={{fontFamily: "noah-regular, sans-serif"}}>
              Keep up to date with our product updates, news and special offers just for you.
            </p>
          
            <div className="flex items-center gap-3 mt-8">
             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-[52px] flex-1 rounded-[8px] bg-[#313b2a] px-4 text-white placeholder:text-[#8D9487] outline-none text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }} />
              <button onClick={handleSubscribe} className="w-[50px] h-13 bg-white rounded-md flex items-center justify-center text-[#171D12] hover:bg-gray-200 transition">
                <HiArrowRight size={21} />
              </button>
            </div>
         </div>
        </div>
         </div>
        </section>
    <ComeMeetUsFooter/>
    </div>
  )
}
