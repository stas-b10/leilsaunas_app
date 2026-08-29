import LeafIcon from "./LeafIcon";
import {useEffect, useState,} from "react";
import { supabase } from "../utils/supabase";
import type { Faq } from "../utils/types/faq";
import type { faq_category } from "../utils/types/faq_category";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

export default function FaqFooter() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<faq_category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase.from("faqs").select("*").order("display_order", { ascending: true });
      if (error) {
        console.error("Error fetching FAQs:", error);
      } else {
        setFaqs(data);
        if (data.length > 0) {
          setActiveCategory(data[0].category_id);
        }
      }
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("faq_categories").select("*").order("display_order", { ascending: true });
      if (error) {
        console.error("Error fetching FAQ categories:", error);
      } else {
        setCategories(data);
        if (data.length > 0 && !activeCategory) {
          setActiveCategory(data[0].id);
        }
      }
    };


    fetchFaqs();
    fetchCategories();
  }, []);

  const selectedCategory = categories.find((category) => category.id === activeCategory);

  return (
    <section className="bg-[#F7F5F0] pt-20 pb-[100px] relative overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto px-8 text-center">
            <div className="justify-center mt-8 mb-6 flex items-center gap-3 text-[#313C2B] text-[16px]">
               <LeafIcon className="w-[12px] h-[12px]" />
                <p style={{ fontFamily: "noah-bold, sans-serif" }}>
                    general faq
                </p>
            </div>
            <h2 className="text-[44px] text-[#313C2B] mb-4" style={{ fontFamily: "sogo-light, sans-serif" }}>
                You ask. We answer.
            </h2>
        <div className="bg-[#EDE9DF] rounded-[8px] p-[8px] w-fit mx-auto mt-8 mb-12">
            <div className="flex justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`cursor-pointer w-[200px] py-3 border-y border-l border-[#c6c0af] first:rounded-l-lg last:border-r last:rounded-r-lg ${activeCategory === category.id ? "bg-[#313C2B] text-[#F7F5F0]" : "bg-[#F7F5F0] text-[#313C2B]"}`}
                        style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-[1.4fr_1fr] gap-3 text-left mt-[70px] items-stretch min-h-[550px]">
            <div className="bg-[#EDE9DF] rounded-[8px] p-8">
            {faqs.filter(faq => faq.category_id === activeCategory).map((faq) => (
                <div key={faq.id} className="border-b border-[#c6c0af] mb-3">
                    <button
                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                        className="w-full text-left py-3 flex justify-between items-center cursor-pointer"
                        style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                        <span>{faq.question}</span>
                        <span className="text-[23px]">{openFaq === faq.id ? <FiMinus /> : <FiPlus />}</span>
                    </button>
                    {openFaq === faq.id && (
                        <div className="pb-5 pt-1" style={{ fontFamily: "noah-regular, sans-serif" }}>
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
            </div>
            <div className="relative min-h-[550px]">
                {selectedCategory?.image_url && (
                    <img src={selectedCategory.image_url} alt={selectedCategory.name} className="absolute inset-0 w-full h-full object-cover rounded-[10px_10px_220px_10px]" />
                )}
            </div>
        </div>
        </div>
    </section>
  )
}
