import aboutImg from "../assets/images/about.png"
import LeafIcon from "../components/LeafIcon";
import Manufacture from "../assets/images/manufacture.png"
import map from "../assets/images/worldmap.png"

export default function About() {
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

        <div className="relative w-full h-[730px]">
          <img src={map} alt="map" className="w-full h-full object-cover" />
        </div>
        </div>
      </section>
      

    </div>
  );
}