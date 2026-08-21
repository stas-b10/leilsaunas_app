import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

import WorldMapSvg from "../assets/world.svg?react";

import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";


export default function WorldMap() {

  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-[700px] overflow-hidden">

        <TransformWrapper
          initialScale={1.6}
          minScale={1.6}
          maxScale={5}
          centerOnInit
          limitToBounds={true}
          centerZoomedOut={true}

          wheel={{
            step: 0.15,
          }}

          doubleClick={{
            mode: "zoomIn",
            step: 0.3,
          }}

          pinch={{
            step: 5,
          }}

          panning={{
            disabled: false,
            velocityDisabled: true,
          }}
        >
          {({ zoomIn, zoomOut}) => (
            <>
              <div className="absolute bottom-9 right-9 z-20 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => zoomIn(0.4)}
                  className="bg-[#F7F5EF] border border-[#C6C0AF] flex items-center justify-center w-10 h-10 rounded-[10px] text-[20px] font-light leading-none shadow-[0_3px_8px_rgba(0,0,0,0.12)] cursor-pointer"
                >
                  <FiPlus />
                </button>

                <button
                  type="button"
                  onClick={() => zoomOut(0.4)}
                  className="bg-[#F7F5EF] border border-[#C6C0AF] flex items-center justify-center w-10 h-10 rounded-[10px] text-[20px] font-light leading-none shadow-[0_3px_8px_rgba(0,0,0,0.12)] cursor-pointer"
                >
                  <FiMinus />
                </button>

              </div>

              <TransformComponent
                wrapperClass="!w-full !h-full map-wrapper"
                contentClass="!w-full !h-full flex items-center justify-center"
              >

                <div className="relative">

                  <WorldMapSvg
                    className="world-map w-[1250px] max-w-none h-auto select-none"
                    onMouseOver={(event) => {
                      const target = event.target as SVGElement;

                      if (target.classList.contains("France")) {
                        setHoveredCountry("France");
                      }
                    }}
                    onMouseOut={(event) => {
                      const target = event.target as SVGElement;

                      if (target.classList.contains("France")) {
                        setHoveredCountry(null);
                      }
                    }}
                  />
                    <span className=" absolute left-[623px] top-[132px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      France
                    </span>
                    <span className=" absolute left-[643px] top-[129px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Switzerland
                    </span>
                    <span className=" absolute left-[663px] top-[126px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Austria
                    </span>
                    <span className=" absolute left-[665px] top-[118px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Czechia
                    </span>
                    <span className=" absolute left-[675px] top-[109px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Poland
                    </span>
                    <span className=" absolute left-[650px] top-[114px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Germany
                    </span>
                    <span className=" absolute left-[635px] top-[108px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Netherlands
                    </span>
                    <span className=" absolute left-[631px] top-[114px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Belgium
                    </span>
                    <span className=" absolute left-[610px] top-[100px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      United Kingdom
                    </span>
                    <span className=" absolute left-[593px] top-[105px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Ireland
                    </span>
                    <span className=" absolute left-[605px] top-[155px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Spain
                    </span>
                    <span className=" absolute left-[590px] top-[160px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Portugal
                    </span>
                    <span className=" absolute left-[661px] top-[149px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Italy
                    </span>
                    <span className=" absolute left-[668px] top-[139px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Croatia
                    </span>
                    <span className=" absolute left-[695px] top-[134px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Romania
                    </span>
                    <span className=" absolute left-[698px] top-[145px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Bulgaria
                    </span>
                    <span className=" absolute left-[728px] top-[177px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                     Cyprus
                    </span>
                    <span className=" absolute left-[692px] top-[91px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Latvia
                    </span>
                    <span className=" absolute left-[690px] top-[84px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Estonia
                    </span>
                    <span className=" absolute left-[658px] top-[70px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Sweden
                    </span>
                    <span className=" absolute left-[648px] top-[95px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Denmark
                    </span>
                    <span className=" absolute left-[678px] top-[45px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Norway
                    </span>
                    <span className=" absolute left-[695px] top-[435px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      South Africa
                    </span>
                    <span className=" absolute left-[1075px] top-[415px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Australia
                    </span>
                    <span className=" absolute left-[1018px] top-[320px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Indonesia
                    </span>
                    <span className=" absolute left-[1078px] top-[170px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Japan
                    </span>
                    <span className=" absolute left-[435px] top-[365px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Brazil
                    </span>
                    <span className=" absolute left-[320px] top-[277px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Costa Rica
                    </span>
                    <span className=" absolute left-[260px] top-[217px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Mexico
                    </span>
                    <span className=" absolute left-[285px] top-[167px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      United States
                    </span>
                    <span className=" absolute left-[305px] top-[87px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Canada
                    </span>
                    <span className=" absolute left-[567px] top-[62px] -translate-x-1/2 -translate-y-full pointer-events-none whitespace-nowrap text-[4px] font-bold text-[#313C2B]">
                      Iceland
                    </span>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

      </div>
    </section>
  );
}