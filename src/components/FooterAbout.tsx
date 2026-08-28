import LeafIcon from "./LeafIcon";

export default function FooterSlide() {


  return (
    <section className="bg-[#2b3527] text-[#f7f5f0] py-26 px-8 relative overflow-hidden select-none">
      
      <div className="max-w-7xl ml-[240px] mb-8 flex items-center gap-2 text-white text-[16px] font-medium tracking-wide">
        <LeafIcon className="w-[12px] h-[12px]" />
        <p style={{ fontFamily: "noah-bold, sans-serif" }}>
          they chose Leil® Saunas.
        </p>
      </div>

    </section>
  );
}