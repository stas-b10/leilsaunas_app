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
                    <span
                      className="
                        absolute
                        left-[50%]
                        top-[25%]
                        -translate-x-1/2
                        -translate-y-full

                        pointer-events-none
                        whitespace-nowrap

                        text-[7px]
                        font-medium
                        text-[#313C2B]

                        transition-opacity
                        duration-150
                      "
                    >
                      France
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