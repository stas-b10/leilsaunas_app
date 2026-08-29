import packingUp from "../assets/images/packingUp.png"
import packingUpSecond from "../assets/images/packingUpSecond.png"
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import ComeMeetUsFooter from "../components/ComeMeetUsFooter";

export default function PackingUp() {

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
              src={packingUp}
              alt={"main_img"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-18 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[1050px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  We’re packing up our saunas and exhibiting this autumn!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[250px]">
         <div className="mt-[100px] grid grid-cols-[1.1fr_0.9fr]">
          <div className="pl-[270px] pr-[50px] flex flex-col space-y-6">
            <h2 className="text-[20px] text-[#778658]" style={{ fontFamily: "noah-bold, sans-serif" }}>
             Published on October 9, 2025
            </h2>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>You can meet us at two fall expos and explore our saunas up close 👇</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>📍 Las Vegas – International Pool | Spa | Patio Expo <br />🗓 Oct 22–24, 2025 <br /> • North Hall • Stand 2415</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>📍 Barcelona – Piscina & Wellness <br />🗓 Nov 17–20, 2025 <br /> • Gran Via, Fira de Barcelona • Stand H1F101</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Whether you’re a distributor or simply someone who just loves sauna, come by, say hi, and let’s talk about sauna life, design, and the passion that keeps us doing what we do.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>For more info, write to us at <strong>info@leilsaunas.com</strong></p>
            <img src={packingUpSecond} alt="comeMeetUsImg" className="w-full h-full rounded-xl" />
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
