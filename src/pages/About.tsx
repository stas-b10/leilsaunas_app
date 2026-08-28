import aboutImg from "../assets/images/about.png"
import LeafIcon from "../components/LeafIcon";
import Manufacture from "../assets/images/manufacture.png"
import map from "../assets/images/worldmap.png"
import AnimatedCounter from "../components/AnimatedCounter";
import aboutCertificate from "../assets/images/aboutCertificate.png"
import saunasell from "../assets/images/saunasell.png"
import coho from "../assets/images/coho.png"
import huum from "../assets/images/huum.png"
import decnord from "../assets/images/decnord.png"
import lunawood from "../assets/images/lunawood.png"
import AboutSlider from "../components/AboutSlider";
import FooterAbout from "../components/FooterAbout";
import FaqFooter from "../components/FaqFooter";
import ArrowMove from "../components/arrowMove";
import { motion } from "framer-motion";
import Staff from "../assets/images/staff.jpg";
import { useNavigate } from "react-router-dom";
import ReadMoreButton from "../components/ReadMoreButton";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black">
      
      <section className="w-full mb-16">
          <div className="relative w-full h-[530px] overflow-hidden">

            <img
              src={aboutImg}
              alt={"main_img"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-10 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[650px] text-[44px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Who we are
                </p>
              </div>
            </div>
          </div>
        </section>

      <section className="pb-[140px]">
        <div className="px-[330px] mt-[100px] ">
          <div className="flex items-center gap-2 text-[#313C2B] text-[16px]">
           <LeafIcon className="w-[12px] h-[12px]" />
            <p style={{ fontFamily: "noah-bold, sans-serif" }}>
               who we are.
            </p>
          </div>
          <p className="text-[20px] text-[#313C2B] pt-[50px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Our story began more than sixteen years ago in a freezing garage, where our two founders, childhood friends, built the first units by hand with equal parts grit and curiosity. That hands-on spirit still drives us today. From those early days, we’ve grown into a modern manufacturer with deep roots in craftsmanship. We design and build on a single 6-hectare manufacturing campus in Estonia, pairing precise engineering with honest, long-lasting materials. Every detail matters: clean lines, smart assembly, efficient heating, and a bathing experience that feels restorative day after day.</p>
          <p className="text-[20px] text-[#313C2B] pt-[50px]" style={{ fontFamily: "noah-regular, sans-serif" }}>We respect tradition while designing for today. We build with Nordic wood, tempered glass, and durable components, and we test our saunas the way they’re meant to be used – out in real weather, with real steam, and real people. The result is reliable performance, simple maintenance, and timeless aesthetics that fit homes, cabins, spas, and hospitality projects.</p>
          <p className="text-[20px] text-[#313C2B] pt-[50px]" style={{ fontFamily: "noah-regular, sans-serif" }}>At heart, we build for real life: for cold-weather recovery, long summer evenings, and unhurried time with people you care about. In a noisy world, our saunas invite a conscious pause, a moment to be present, where heat, wood, and  <strong>leil</strong>  reconnect you with nature and yourself. Deep rest isn’t a luxury; it’s a universal need. And if a product doesn’t serve that feeling, it doesn’t leave our factory.</p>
        </div>
      </section>

      <section className="pb-[140px] bg-[#EFECE1]">
        <div className="px-[230px] pt-[100px] ">
           <div className="relative overflow-hidden grid grid-cols-2 gap-24">
            <img src={Manufacture} alt="manufacturer" className="w-full h-[460px] object-cover rounded-tr-[220px] rounded-[12px] "/>
              <div className="max-w-[600px]">
                <h2 className="text-[44px] leading-[1.2] text-[#313C2B]" style={{ fontFamily: "sogo-light, sans-serif" }}>Not just another sauna manufacturer</h2>
                <p className="text-[20px] text-[#313C2B] mt-6" style={{ fontFamily: "noah-regular, sans-serif" }}>We design and manufacture every sauna in <strong>Võnnu</strong>, a small town in Southern Estonia, shaped by centuries of sauna culture. Our production blends advanced technology with this deep-rooted heritage, continuing the story of sauna from its historical birthplace.</p>
                <p className="text-[20px] text-[#313C2B] mt-6" style={{ fontFamily: "noah-regular, sans-serif" }}>Consistency and reliability are core to how we work. Our production capacity exceeds 250 saunas per month, supported by a global network of partners – more than fifty resellers in over thirty five countries, who help us deliver on time and stand behind every installation.</p>
                <ul className="flex items-center gap-8 mt-8">
                  <li className="flex items-center gap-2 text-[#313C2B] text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
                  <LeafIcon className="w-[12px] h-[12px]" />
                    7 hectars
                  </li>
                  <li className="flex items-center gap-2 text-[#313C2B] text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
                  <LeafIcon className="w-[12px] h-[12px]" />
                    9 factory halls
                  </li>
                  <li className="flex items-center gap-2 text-[#313C2B] text-[16px]">
                  <LeafIcon className="w-[12px] h-[12px]" />
                    <span style={{ fontFamily: "noah-bold, sans-serif" }}>8846 m<sup className="text-[12px]">2</sup> indoor space</span>
                  </li>
                </ul>
              </div>
          </div>
        </div>
         <div className="relative px-[100px]">
            <img src={map} alt="map" className="absolute top-0 left-1/2 -translate-x-1/2 w-[1500px] h-auto object-contain" />
             <div className="relative z-10">
             <div className="grid grid-cols-4 gap-8 px-[80px] pt-[290px]">
             <div className="text-center whitespace-nowrap leading-none">
              <div className="text-[64px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><AnimatedCounter target={18} duration={700}/></div>
              <p className="text-[#313C2B] mt-1 text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Years of experience</p>
            </div>

             <div className="text-center whitespace-nowrap leading-none">
              <div className="text-[64px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><AnimatedCounter target={35} duration={700}/></div>
              <p className="text-[#313C2B] mt-1 text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Different countries</p>
            </div>

             <div className="text-center whitespace-nowrap leading-none">
              <div className="text-[64px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><AnimatedCounter target={17300} duration={700}/></div>
              <p className="text-[#313C2B] mt-1 text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Saunas manufactured</p>
            </div>

            <div className="text-center whitespace-nowrap leading-none" >
              <div className="text-[64px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}><AnimatedCounter target={80} duration={700}/></div>
              <p className="text-[#313C2B] mt-1 text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>Leil professionals</p>
            </div>
            </div>
      
          <div className="grid grid-cols-[1.1fr_1.05fr] gap-24 px-[130px] pt-[250px] pb-[150px]">

            <div className="max-w-[690px] px-[50px]">
              <h2 className="text-[44px] leading-[1.2] text-[#313C2B]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                Recognized worldwide.
              </h2>

              <p className="text-[20px] text-[#313C2B] mt-6" style={{ fontFamily: "noah-regular, sans-serif" }} >
                Our design comes from the Nordics at heart: clear lines, natural materials, and details that work every day. We build for real life, then test with real people, and keep improving based on their feedback. That mindset has earned recognition from international juries and from the people who use our saunas daily. In 2024 we received  <strong>Red Dot: Best of the Best</strong> design award, which reflects both design quality and practical performance. Partners choose us because our saunas look modern, hold up to heavy use, and are straightforward to install and maintain. <br/><br/>Good design should feel easy, yet timeless.<br/>Ours is made to stay that way.
              </p>
            </div>

            <img src={aboutCertificate} alt="aboutCertificate" className="w-full h-[460px] object-cover rounded-tl-[220px] rounded-[2px]" />

          </div>

          <div className="flex items-center justify-center gap-40">
                <div className="flex items-center justify-center">
                 <img src={saunasell} alt="saunasell" className="mx-auto w-auto h-4" />
                </div>

                <div className="flex items-center justify-center">
                 <img src={coho} alt="coho" className="mx-auto w-auto h-12" />
                </div>

                <div className="flex items-center justify-center">
                 <img src={huum} alt="huum" className="mx-auto w-auto h-12" />
                </div>

                <div className="flex items-center justify-center">
                 <img src={decnord} alt="decnord" className="mx-auto w-auto h-12" />
                </div>

                <div className="flex items-center justify-center">
                 <img src={lunawood} alt="lunawood" className="mx-auto w-auto h-12" />
                </div>
          </div>
         </div>
         <div className="px-[150px] mt-[70px] ">
         <div className="flex items-center gap-2 text-[#313C2B] text-[16px]">
           <LeafIcon className="w-[12px] h-[12px]" />
            <p style={{ fontFamily: "noah-bold, sans-serif" }}>
               why partners choose us
            </p>
            
          </div>
          
          </div>
          
       </div>
        <div>
         <AboutSlider/>
        </div>
      </section>
      <FooterAbout/>
      <FaqFooter />
      <section className="bg-[#313b2a] px-[240px] py-[80px] -mt-24">
  <div className="max-w-[1460px] text-white">

    <div
      className="flex items-center gap-2 mb-12 opacity-90 text-[16px]"
      style={{ fontFamily: "noah-bold, sans-serif" }}
    >
      <LeafIcon className="w-[12px] h-[12px]" />
      <span>read what we're up to.</span>
    </div>

    <div className="grid grid-cols-2 gap-16 items-start">
      <div className="relative group rounded-[15px] overflow-hidden h-[640px]">
        <img
          src={Staff}
          alt="Leil Saunas Staff"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span
          className="absolute right-5 top-[30px] rounded-full bg-white/10 px-[27px] py-[12px] text-[19px] text-white backdrop-blur-sm border border-white/20"
          style={{ fontFamily: "noah-bold, sans-serif" }}
        >
          Featured
        </span>

        <div className="absolute bottom-8 left-8 right-8">
          <h3
            className="text-[36px] leading-[1.1] mb-6 font-light max-w-[445px]"
            style={{ fontFamily: "noah-regular, sans-serif" }}
          >
            Come meet us at upcoming expos & sauna events in 2026
          </h3>

          <ReadMoreButton />
        </div>
      </div>

      <div className="flex flex-col justify-between h-[540px] py-1 max-w-[630px] ml-[20px] -mt-6">
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/cold-first-then-heat")}
          className="border-b border-white/20 pb-4 pt-4 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                Cold first, then heat. A calmer way to do contrast, with science behind it
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                03.03.2026
              </p>
            </div>

            <div className="mt-[100px] flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/sauna-culture")}
          className="border-b border-white/20 py-8 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                Sauna culture begins in Estonia
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                15.10.2025
              </p>
            </div>

            <div className="mt-12 flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/were-packing-up-our-saunas")}
          className="pt-6 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                We’re packing up our saunas and exhibiting this autumn!
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                09.10.2025
              </p>
            </div>

            <div className="mt-[100px] flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        <div className="border-t border-white/20 mt-6"></div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}