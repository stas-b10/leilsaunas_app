import leilsaunas from "../../public/video/leilsaunas.mp4";
import LeafIcon from "../components/LeafIcon";
import outdoor_outside from "../assets/images/outdoor_outside.png";
import outdoor_inside from "../assets/images/outdoor_inside.png";
import indoor_inside from "../assets/images/indoor_inside.png";
import indoor_outside from "../assets/images/indoor_outside.png";
import SaunaCard from "../components/SaunaCard";
import ValueSlider from "../components/ValueSlider";
import worldMap from "../assets/images/worldmap.png"
import Worldmap from "../components/WorldmapButton"
import aboutImage from "../assets/images/about_sauna.png";
import AboutUsButton from "../components/AboutUsButton";
import AmbasadorsSlider from "../components/AmbasadorsSlider"
import CollectionCards from "../components/CollectionCards";
import Staff from "../assets/images/staff.jpg"
import ReadMoreButton from "../components/ReadMoreButton"
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import ArrowMove from "../components/arrowMove"
import { motion } from "framer-motion";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative h-screen overflow-hidden bg-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={leilsaunas} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-8 left-10 z-20 w-full px-[220px]">
          <div className="flex items-center gap-40">
            <h1
              className="max-w-[800px] text-white text-[64px] leading-[1.05] font-light"
              style={{ fontFamily: "sogo-light, sans-serif" }}
            >
              A mindful pause.
              <br />
              At your own pace.
            </h1>

            <div
              className="max-w-[350px] text-white"
              style={{ fontFamily: "noah-bold, sans-serif" }}
            >
              <p className="text-[20px]">High-quality premium class saunas.</p>
              <p className="-mt-0.5 text-[20px] opacity-80">
                Scroll to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5F0] py-[100px] px-[280px]">
        <div className="flex justify-between items-start mb-[80px]">
          <div className="flex items-center gap-2 text-[#313C2B] text-[17px]"
            style={{ fontFamily: "noah-bold, sans-serif" }}>
            <LeafIcon className="w-[12px] h-[12px]" />
            bring the Leil® ritual home.
          </div>

          <div className="max-w-[600px] mr-[80px]">
            <h2
              className="text-[44px] leading-[1.1] font-light text-[#313C2B]"
              style={{ fontFamily: "sogo-light, sans-serif" }}
              
            >
              Handcrafted saunas with the highest quality
            </h2>

            <p
              className="mt-6 text-[20px] text-[#313C2B] leading-[1.6]"
              style={{ fontFamily: "noah-regular, sans-serif" }}
            >
              Discover our wide range of high-quality saunas crafted by our team
              of experienced manufacturers. Each sauna is designed with
              meticulous attention to detail.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

        <SaunaCard
          title="Outdoor Saunas"
          outside={outdoor_outside}
          inside={outdoor_inside}
          outsideClass="mr-[47px] mb-[3px]"
        />
  

        <SaunaCard
          title="Indoor Saunas"
          outside={indoor_outside}
          inside={indoor_inside}
          outsideClass="ml-[42px]"
        />
            <div className="flex justify-between items-start mt-[120px]">
            <div className="flex items-center gap-2 text-[#313C2B] text-[17px]"
            style={{ fontFamily: "noah-bold, sans-serif" }}>
            <LeafIcon className="w-[12px] h-[12px]" />
            the values we build with.
          </div>
          
          </div>
        </div>
      </section>
      <div className="-mt-[90px]">
        <ValueSlider />
      </div>
    <section className="bg-[#F7F5F0] pt-[150px] pb-[220px] overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-[80px] relative">

    <img
      src={worldMap}
      alt="World map"
      className="absolute left-1/2 -top-[90px] -translate-x-1/2 w-[1000px] opacity-40 pointer-events-none select-none "
    />

    <div className="relative z-10 flex flex-col items-center text-center pt-[100px]">
      <h2
        className="text-[44px] leading-[1.05] text-[#313C2B] font-light max-w-[1100px] "
        style={{ fontFamily: "sogo-light, sans-serif" }}
      >
        Crafted by hand. Found worldwide.
      </h2>

      <p
        className="mt-6 text-[20px] text-[#313C2B]"
        style={{ fontFamily: "noah-regular, sans-serif" }}
      >
        Available through our distributor network in over 35 countries.
      </p>
      <div className="mt-6">
      <Worldmap/>
      </div>
    </div>
  </div>
</section>

<section className="bg-[#F7F5F0] pb-[160px] ">
  <div className="max-w-[1360px] mx-auto mt-[65px]">

      <div className="relative overflow-hidden rounded-tr-[220px] rounded-[12px]">
      <img
        src={aboutImage}
        alt="Leil Saunas"
        className="w-full h-[620px] object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute left-[105px] top-[160px] z-10 max-w-[520px]">
        <div
          className="flex items-center gap-3 text-white mb-8"
          style={{ fontFamily: "noah-bold, sans-serif" }}
        >
          <LeafIcon className="w-[12px] h-[12px]" />
          <span>learn more about us.</span>
        </div>

        <h2
          className="text-white text-[44px] leading-[1.05]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          Brought to you by one of the world's leading sauna manufacturers.
        </h2>

        <div className="mt-6">
          <AboutUsButton />
        </div>
      </div>
    </div>

    <div
      className="flex items-center gap-3 mt-[105px] text-[#313C2B] "
      style={{ fontFamily: "noah-bold, sans-serif" }}
    >
      <LeafIcon className="w-[12px] h-[12px]" />
      <span>they chose Leil® Saunas.</span>
    </div>
  </div>
</section>
<div>
<AmbasadorsSlider />
</div>
  <section className="bg-[#F7F5F0] py-[265px] px-[280px]">
        <div className="flex justify-between items-start mb-[80px] -translate-y-40">
          <div className="flex items-center gap-2 text-[#313C2B] text-[17px] -ml-[50px]"
            style={{ fontFamily: "noah-bold, sans-serif" }}>
            <LeafIcon className="w-[12px] h-[12px]" />
            something for everyone.
          </div>

          <div className="max-w-[600px] mr-[80px]">
            <h2
              className="text-[44px] leading-[1.1] font-light text-[#313C2B]"
              style={{ fontFamily: "sogo-light, sans-serif" }}
              
            >
              Crafted with quality and character in mind
            </h2>

            <p
              className="mt-6 text-[20px] text-[#313C2B] leading-[1.6]"
              style={{ fontFamily: "noah-regular, sans-serif" }}
            >
              We've categorized our products into <span style={{ fontFamily: "noah-bold, sans-serif" }}>Pure, Elegant, and Premium</span> collections - based on design, size, features, and more. Explore our full range there.
            </p>
          </div>
        </div>
  </section>
  <section className="relative px-[230px] pb-[120px] -mt-[400px]">
  <div className="absolute inset-0">
    <div className="h-1/2 bg-[#F7F5F0]" />
    <div className="h-1/2 bg-[#313b2a]" />
  </div>
  <CollectionCards />
</section>

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
          onClick={() => navigate("/about")}
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
          onClick={() => navigate("/contacts")}
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
          onClick={() => navigate("/about")}
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
        </motion.div>
        <div className="border-t border-white/20 mt-6"></div>
      </div>
    </div>
  </div>
</section>


    </>
  );
};

export default Home;