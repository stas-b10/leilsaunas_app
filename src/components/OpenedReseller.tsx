import { useEffect, useState } from "react";
import type { Series } from "../utils/types/series";
import { supabase } from "../utils/supabase";
import type { Country } from "../utils/types/country";
import { TiLocation } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";


interface OpenedResellerProps {
  country: Country;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OpenedReseller({
  country,
  onClose,
  onSuccess,
}: OpenedResellerProps) {

  const [series, setSeries] = useState<Series[]>([]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: false,email: false,message: false,privacy: false,});

   useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const loadSeries = async () => {
      const { data, error } = await supabase
        .from("series")
        .select("*");

      if (error) {
        console.error("Error loading series:", error);
        return;
      }

      setSeries(data || []);
    };

    loadSeries();
  }, []);

  const handleSubmit = async () => {
  const newErrors = {
    name: !name.trim(),
    email: !email.trim(),
    message: !message.trim(),
    privacy: !privacyAccepted,
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some(Boolean)) {
    return;
  }

  setIsSubmitting(true);

  const { error } = await supabase
    .from("reseller_requests")
    .insert({
      country_id: country.id,
      name: name.trim(),
      company_name: companyName.trim() || null,
      phone_number: phoneNumber.trim() || null,
      email: email.trim(),
      series_id: selectedSeries || null,
      message: message.trim(),
      privacy_policy_accepted: privacyAccepted,
      newsletter_consent: newsletterConsent,
    });

  setIsSubmitting(false);

  if (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
    return;
  }

  onSuccess();
};

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="relative w-[1000px] h-[750px] bg-[#f7f5ef] rounded-[10px] p-10 overflow-y-auto">
        <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-2">
          <TiLocation className="text-[#707F4F] text-[24px] mb-1" />
          <h2 style={{ fontFamily: "noah-bold, sans-serif" }} className="text-[26px] text-[#313C2B]">Contact the local reseller in {country.name}</h2>
        </div>

        <button
          style={{ fontFamily: "noah-bold, sans-serif" }}
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-[20px] text-[#313C2B] cursor-pointer mt-2"
        >
          Close
          <IoClose className="text-[24px] " />
        </button>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: false })); }} className={`w-full rounded-[6px] border ${errors.name ? "border-red-500" : "border-[#C6C0AF]"} bg-transparent px-4 py-3 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200`}/>
              {errors.name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company_name" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Company name
              </label>
              <input id="company_name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                     className="w-full h-[52px] rounded-[6px] border border-[#C6C0AF] bg-transparent 
                     px-4 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200" />
             </div>
              
            <div className="flex flex-col gap-2">
              <label htmlFor="phone_number" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Phone number
              </label>
              <input id="phone_number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                     className="w-full h-[52px] rounded-[6px] border border-[#C6C0AF] bg-transparent 
                     px-4 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200" />
             </div>

             <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Email address <span className="text-red-500 w-2 h-2 ml-[1px]">*</span>
              </label>
              <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: false })); }}
                     className={`w-full rounded-[6px] border ${errors.email ? "border-red-500" : "border-[#C6C0AF]"} bg-transparent px-4 py-3 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200`}/>
                     {errors.email && (<span className="text-red-500 text-[11px]">This field is required</span>)}
             </div>
             
             <div className="flex flex-col gap-2">
              <label htmlFor="series" className="text-[20px] text-[#313C2B]" 
                      style={{ fontFamily: "noah-bold, sans-serif" }}>Desired Sauna Series
              </label>
              <select id="series" value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)}
                     className="w-full h-[52px] rounded-[6px] border border-[#C6C0AF] bg-transparent 
                     px-4 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200 appearance-none">
                       <option value="">- Select -</option>

                       {series.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.series_name}
                        </option>
                        ))}
              </select>
             </div>
             <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="message" className="text-[20px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Tell us More <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <textarea id="message" rows={3} value={message} onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: false })); }} className={`w-full rounded-[6px] border ${errors.message ? "border-red-500" : "border-[#C6C0AF]"} bg-transparent px-4 py-3 outline-none text-[#313C2B] focus:border-gray-500 focus:bg-white transition-all duration-200`}/>
              {errors.message && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>
            
            {/* //News */}
            <div className="col-span-2 mt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={newsletterConsent} onChange={(e) => setNewsletterConsent(e.target.checked)} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[15px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className="text-[17px] text-[#313C2B]">I would like to receive the newsletter, product updates  & offers </span>
              </label>
            </div>

            {/* //privacy&policy  */}
            <div className="col-span-2 ">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative">
                <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#C6C0AF] bg-transparent cursor-pointer checked:bg-[#BAB6A7] checked:border-[#C6C0AF] transition-all duration-200" />
                <FaCheck className="absolute top-[13px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[15px] pointer-events-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span style={{ fontFamily: "noah-regular, sans-serif" }} className={`text-[17px] ${errors.privacy ? "text-red-500" : "text-[#313C2B]"}`}>I have read and agree with <a href="/privacy-policy" className={`underline ${errors.privacy ? "text-red-500" : "text-[#707F4F]"}`} >Privacy Policy *</a></span>
              </label>
              {errors.privacy && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>
            
            {/* //button */}
            <div className="col-span-2 flex justify-end mt-4">
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ fontFamily: "noah-bold, sans-serif" }} className="w-full h-[42px] rounded-[6px] border border-[#C6C0AF] bg-[#313B2A] cursor-pointer px-4 outline-none text-white focus:border-gray-500 focus:bg-white transition-all duration-200">
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
    
  );
}