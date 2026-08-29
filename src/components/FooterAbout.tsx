import LeafIcon from "./LeafIcon";
import WhatLeil from "./WhatLeil";

export default function FooterSlide() {


  return (
    <section className="bg-[#1B2017] text-[#f7f5f0] px-4 py-[50px] relative overflow-hidden select-none min-h-[680px]">
       <div className="max-w-[1400px] mx-auto pt-[90px]">
        <div className="grid grid-cols-2 gap-20">
         <div className="relative -ml-[30px]">
          <div className="flex items-center gap-2 text-white text-[16px] font-medium tracking-wide pt-[55px] px-12">
        <LeafIcon className="w-[12px] h-[12px]" />
        <p style={{ fontFamily: "noah-bold, sans-serif" }}>
          take a break.
        </p>
         </div>
        </div>
         <div className="flex flex-col justify-start">
          <h2 className="text-[44px] pt-[35px]" style={{ fontFamily: "sogo-light, sans-serif" }}>The story behind our name</h2>
          <p className="text-[20px] pt-[19px]" style={{ fontFamily: "noah-regular, sans-serif" }}><em>leil (Estonian, n.)</em><br/> the steam that rises when water meets hot stones in a sauna. It’s the word at the heart of how we build and the culture we come from.</p>
          <p className="text-[20px] pt-[15px]" style={{ fontFamily: "noah-regular, sans-serif" }}>For centuries, the sauna has been a sacred place for the people of the North. <em>Leil</em> is at the heart of this experience.</p>
         <div className="pt-[35px]">
          <WhatLeil/>
         </div>
         </div>
        </div>
      </div>
    </section>
  );
}