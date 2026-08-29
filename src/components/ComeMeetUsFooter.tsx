import React from 'react'
import ArrowMove from './arrowMove'
import { motion } from 'framer-motion'
import ReadMoreButton from './ReadMoreButton'
import LeafIcon from './LeafIcon'
import Staff from "../assets/images/staff.jpg"
import { useNavigate } from 'react-router-dom'

export default function ComeMeetUsFooter() {
    const navigate = useNavigate();

  return (
    <section className="bg-[#313b2a] px-[240px] py-[100px] -mt-24">
      <div className="max-w-[1460px] text-white">

    <div
      className="flex items-center gap-2 mb-12 opacity-90 text-[16px]"
      style={{ fontFamily: "noah-bold, sans-serif" }}
    >
      <LeafIcon className="w-[12px] h-[12px]" />
      <span>read what we're up to.</span>
    </div>

    <div className="grid grid-cols-2 gap-16 items-start">
      <div className="relative group rounded-[15px] overflow-hidden h-[640px]">
        <img
          src={Staff}
          alt="Leil Saunas Staff"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span
          className="absolute right-5 top-[30px] rounded-full bg-white/10 px-[27px] py-[12px] text-[19px] text-white backdrop-blur-sm border border-white/20"
          style={{ fontFamily: "noah-bold, sans-serif" }}
        >
          Featured
        </span>

        <div className="absolute bottom-8 left-8 right-8">
          <h3
            className="text-[36px] leading-[1.1] mb-6 font-light max-w-[445px]"
            style={{ fontFamily: "noah-regular, sans-serif" }}
          >
            Come meet us at upcoming expos & sauna events in 2026
          </h3>

          <ReadMoreButton />
        </div>
      </div>

      <div className="flex flex-col justify-between h-[540px] py-1 max-w-[630px] ml-[20px] -mt-6">
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/cold-first-then-heat")}
          className="border-b border-white/20 pb-4 pt-4 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                Cold first, then heat. A calmer way to do contrast, with science behind it
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                03.03.2026
              </p>
            </div>

            <div className="mt-[100px] flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/sauna-culture")}
          className="border-b border-white/20 py-8 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                Sauna culture begins in Estonia
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                15.10.2025
              </p>
            </div>

            <div className="mt-12 flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => navigate("/were-packing-up-our-saunas")}
          className="pt-6 cursor-pointer"
        >
          <div className="flex justify-between items-start gap-6">
            <div>
              <p
                className="text-[26px] leading-[1.25] font-light"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                We’re packing up our saunas and exhibiting this autumn!
              </p>

              <p
                style={{ fontFamily: "noah-regular, sans-serif" }}
                className="text-[20px] opacity-60 mt-4"
              >
                09.10.2025
              </p>
            </div>

            <div className="mt-[100px] flex-shrink-0">
              <ArrowMove />
            </div>
          </div>
        <div className="border-t border-white/20 mt-6"></div>
        </motion.div>
      </div>
      </div>
     </div>
    </section>
  )
}
