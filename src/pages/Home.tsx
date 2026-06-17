import leilsaunas from "../../public/video/leilsaunas.mp4";
import LeafIcon from "../components/LeafIcon";
import outdoor_outside from "../assets/images/outdoor_outside.png";
import outdoor_inside from "../assets/images/outdoor_inside.png";
import indoor_inside from "../assets/images/indoor_inside.png";
import indoor_outside from "../assets/images/indoor_outside.png";
import SaunaCard from "../components/SaunaCard";

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
        </div>
      </section>
    </>
  );
};

export default Home;