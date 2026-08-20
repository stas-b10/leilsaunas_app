import ContactMain from "../assets/images/contact_main.png"

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