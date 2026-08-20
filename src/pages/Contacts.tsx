import ContactMain from "../assets/images/contact_main.png"
import ContactUsButton from "../components/ContactUsButton";
import LeafIcon from "../components/LeafIcon";

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
        className="h-[500px] w-full bg-gray-300 flex items-center justify-center"
      >
        <p className="text-xl font-semibold opacity-70">
          Map goes here
        </p>
      </section>

    </div>
  );
}