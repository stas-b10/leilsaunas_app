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

const Home = () => {
  return (
    <>
      <section className="relative h-screen overflow-hidden">
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
          slug="Outdoor saunas"
          outside={outdoor_outside}
          inside={outdoor_inside}
          outsideClass="mr-[47px] mb-[3px]"
        />
  

        <SaunaCard
          title="Indoor Saunas"
          slug="Indoor saunas"
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
    </>
  );
};

export default Home;