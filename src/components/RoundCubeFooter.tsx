import LeafIcon from './LeafIcon'
import roundCube from '../assets/images/RoundCubeFooter.jpg'
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const details = [
    {
        title: "Award-Winning Design",
        answer: "Round Cube® sauna has received recognition from one of the world’s most famous design competitions, winning the prestigious Red Dot Design Award Best of the Best."
    },
    {
        title: "Various layouts and models",
        answer: "We offer various Round Cube® models, each with its own dimensions, room layout, and bench configurations. That way, anyone can find the perfect option for their preferences and space needs."
    },
    {
        title: "Every detail is unique",
        answer: "The Round Cube® sauna stands out in every detail. The juniper wall embodies a unique South Estonian craft tradition, handmade by elder craftswomen."
    }
]

export default function RoundCubeFooter() {
    const [openAnswerIndex, setOpenAnswerIndex] = useState<number | null>(null);
  return (
    <div className="bg-[#EDE9DF]">
     <section className="relative w-full overflow-hidden">
        <img src={roundCube} alt="Round Cube" className="absolute inset-0 w-full h-full object-cover" />
       <div className="relative z-10 pt-[75px] pb-[50px]">
       <div className="ml-[260px] flex items-center gap-2 text-white text-[16px] font-medium tracking-wide">
        <LeafIcon className="w-[12px] h-[12px]" />
        <p style={{ fontFamily: "noah-bold, sans-serif" }}>what makes Round Cube® Saunas different?</p>
       </div>
       <div className="ml-[260px] mt-[110px] w-[660px] ">
        {details.map((detail, index) => (
         <div key={index} className={`border border-white/30 rounded-[8px] mb-3 px-6 py-5 backdrop-blur-md transition-colors duration-500 ${openAnswerIndex === index ? "bg-[#313C2B] border-none" : "bg-transparent"}`}>
            <button onClick={() => setOpenAnswerIndex(openAnswerIndex === index ? null : index)} className="text-[26px] text-white w-full text-left flex justify-between items-center cursor-pointer" style={{ fontFamily: "noah-bold, sans-serif" }}>
              <span>{detail.title}</span>
              <span className="text-[23px]">{openAnswerIndex === index ? <FiMinus /> : <FiPlus />}</span>
            </button>
            {openAnswerIndex === index && (
             <p className="mt-4 text-[20px] text-white" style={{ fontFamily: "noah-regular, sans-serif" }}>
                {detail.answer}
             </p>
            )}
            </div>
          ))}
        </div>
       </div>
     </section>
    </div>
  )
}
