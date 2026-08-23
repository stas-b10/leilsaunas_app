import ContactMain from "../assets/images/contact_main.png"
import ContactUsButton from "../components/ContactUsButton";
import LeafIcon from "../components/LeafIcon";
import WorldMap from "../components/WorldMap";

export default function Contacts() {
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
          <span style={{ fontFamily: "noah-bold, sans-serif" }} className="text-white text-[16px]">our team.</span>
        </div>
        <div>
          <h2 style={{ fontFamily: "sogo-light, sans-serif" }} className="text-[44px] text-white pt-[40px]">Our Team</h2>
          <p style={{ fontFamily: "noah-regular, sans-serif" }} className="text-white text-[20px] mt-4">Discover our exceptional range of high-quality, premium class saunas crafted by a team of experienced manufacturers.</p>
        </div>
      </div>
      </section>

    </div>
  );
}