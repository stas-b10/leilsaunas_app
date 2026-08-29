import saunaCulture from "../assets/images/saunaCulture.png"
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import ComeMeetUsFooter from "../components/ComeMeetUsFooter";

export default function SaunaCulture() {

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
              src={saunaCulture}
              alt={"main_img"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-18 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[1050px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Sauna culture begins in Estonia
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[250px]">
         <div className="mt-[100px] grid grid-cols-[1.1fr_0.9fr]">
          <div className="pl-[270px] pr-[50px] flex flex-col space-y-6">
            <h2 className="text-[20px] text-[#778658]" style={{ fontFamily: "noah-bold, sans-serif" }}>
             Published on October 15, 2025
            </h2>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>In Estonia, sauna is far more than just heat and steam. It’s a living cultural heritage that has shaped the rhythm of daily life for centuries. To understand sauna culture is to step into Estonia’s history, traditions, and its deep connection to nature. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}><strong>A Tradition Rooted in Centuries</strong></p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>The first written mentions of Estonian saunas date back to the 13th century. On almost every farmstead, sauna was one of the first buildings to be constructed—sometimes even before the family house. These were not just places for bathing, but spaces where life unfolded: women gave birth in saunas, families gathered for important discussions, and communities came together for cleansing and renewal. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>By comparison, Finland—today often considered the modern “sauna capital”—saw its sauna tradition documented later, around the 16th century. While both cultures share similar values of wellness and simplicity, Estonia’s heritage runs several centuries deeper, with practices that have been carefully preserved and passed down through generations. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>One of the most unique expressions of this heritage is the <em>suitsusaun</em>, or smoke sauna. Heated without a chimney, these saunas create a dense, aromatic atmosphere where time seems to slow down. In 2014, UNESCO recognized the smoke sauna tradition of Võrumaa, Southern Estonia, as part of the Intangible Cultural Heritage of Humanity – an acknowledgment of its cultural depth and enduring significance. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}><strong>More Than Heat: A Place for Healing</strong></p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>In Estonia, saunas have never been purely physical spaces; they have always carried emotional and even spiritual significance.</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Inside a smoke sauna, the air is thick not just with steam but with a sense of presence. Families and friends gather here to share stories, process emotions, and reconnect with each other and with themselves. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Traditional rituals like whisking with birch branches <em>vihtlemine</em>) stimulate circulation and awaken the senses, while cooling dips in a lake or a roll in the snow balance the intensity of the heat. Modern research confirms what Estonians have known for centuries: regular sauna bathing supports heart health, reduces stress, and improves sleep quality. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>As the documentary <em>Smoke Sauna Sisterhood</em> beautifully captures, these saunas even serve as sanctuaries for emotional release – where words flow freely, and silence heals as deeply as conversation. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}><strong>From Ancient Ritual to Modern Design</strong></p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>While the traditional smoke sauna remains the cultural root, Estonian sauna craftsmanship has evolved over centuries. Chimneys, tempered glass, and precision-made stoves have replaced the rustic simplicity of earlier times. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Yet, even in contemporary design, one principle holds true: a sauna is never just a room. It is a sanctuary built with intention—a bridge between past and present, between nature and modern life. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Why It Still Matters</p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>In a world that moves faster every day, the Estonian sauna offers a pause—a conscious, grounding ritual that reminds us to slow down. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>1.</strong> Connection to nature: Saunas are often placed close to lakes, forests, or open fields, creating a direct link between heat and the elements. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>2.</strong> A sense of community: Whether shared with family or friends, saunas foster intimacy and honest conversation. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><strong>3.</strong> Well-being that lasts: From boosting circulation to lowering stress levels, a sauna’s benefits extend far beyond its wooden walls. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>This is why, even today, many Estonians will still build their sauna before their house. It is not just tradition. It is a foundation for life. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}><strong>Leil®: Carrying the Tradition Forward</strong></p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>At Leil®, we honor this heritage. We design saunas that are rooted in Estonia’s centuries-old culture but elevated with modern materials, award-winning craftsmanship, and sustainability at their core. </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>When you step into a Leil® sauna, you’re not just entering a heated room. <br/> You’re stepping into a ritual that began hundreds of years ago. <br /> You’re carrying forward a piece of Estonia—into your own home, into your own rhythm, and into your own well-being.  </p>
            <p className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>Because sauna culture doesn’t simply come from anywhere. <br/> It begins here. In Estonia. </p>
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
