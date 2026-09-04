import { useState, useEffect, useMemo } from "react";
import { supabase } from "../utils/supabase";
import type { OptionGroups } from '../utils/types/option_groups'
import type { SaunaModel } from '../utils/types/sauna_models'
import type { SaunaImages } from '../utils/types/sauna_images'
import type { OptionValues } from '../utils/types/option_value'
import type { OptionLayers } from '../utils/types/option_layers'
import type { ModelOptionValues } from '../utils/types/model_option_values'
import { useNavigate, useParams } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { HiMiniCube } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { LuX } from "react-icons/lu";
import type { countries } from "../utils/types/all_countries";
import type { UserInput } from "../utils/types/user_input";


export default function SaunaModels() {
  const { model_slug } = useParams<{ model_slug: string }>();
  const navigate = useNavigate();
  const [saunaModel, setSaunaModel] = useState<SaunaModel | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroups[]>([]);
  const [optionValues, setOptionValues] = useState<OptionValues[]>([]);
  const [optionLayers, setOptionLayers] = useState<OptionLayers[]>([]);
  const [modelOptionValues, setModelOptionValues] = useState<ModelOptionValues[]>([]);
  const [saunaImages, setSaunaImages] = useState<SaunaImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [sizeUnit, setSizeUnit] = useState<"EU" | "US">("EU");
  const [country,setCountry] = useState<countries[]>([]);
  const [userInput, setUserInput] = useState<UserInput>({name: "", email: "", country: "", phone: "", additionalComments: "",});

  
  const [errors, setErrors] = useState({name: false,email: false, country: false,additionalComments: false,});

  useEffect(() => {
    if (!model_slug) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data: saunaModelData, error: saunaModelError } = await supabase
          .from("sauna_models")
          .select("*")
          .eq("slug", model_slug)
          .single();


        if (saunaModelError || !saunaModelData) {
          console.error("Sauna model error:", saunaModelError);
          return;
        }

        setSaunaModel(saunaModelData);

        const[optionGroupsResult, optionValuesResult, optionLayersResult, modelOptionValuesResult, saunaImagesResult, countriesResult,] = await Promise.all([
          supabase.from("option_groups").select("*").order("display_order", { ascending: true }),
          supabase.from("option_values").select("*").order("display_order", { ascending: true }),
          supabase.from("option_layers").select("*").eq("model_id", saunaModelData.id).order("display_order", { ascending: true }),
          supabase.from("model_option_values").select("*").eq("model_id", saunaModelData.id),
          supabase.from("sauna_model_images").select("*").eq("model_id", saunaModelData.id).order("display_order", { ascending: true }),
          supabase.from("all_countries").select("*").order("name", { ascending: true }),
        ]);

        if (optionGroupsResult.error) {
          console.error("Option groups error:", optionGroupsResult.error);
          return;
        }

        if (optionValuesResult.error) {
          console.error("Option values error:", optionValuesResult.error);
          return;
        }

        if (optionLayersResult.error) {
          console.error("Option layers error:", optionLayersResult.error);
          return;
        }

        if (modelOptionValuesResult.error) {
          console.error("Model option values error:", modelOptionValuesResult.error);
          return;
        }

        if (saunaImagesResult.error) {
          console.error("Sauna images error:", saunaImagesResult.error);
          return;
        }
        if (countriesResult.error) {
          console.error("Countries error:", countriesResult.error);
          return;
        }

        setOptionGroups(optionGroupsResult.data || []);
        setOptionValues(optionValuesResult.data || []);
        setOptionLayers(optionLayersResult.data || []);
        setModelOptionValues(modelOptionValuesResult.data || []);
        setSaunaImages(saunaImagesResult.data || []);
        setCountry(countriesResult.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model_slug]);

const availableOptionValues = useMemo(() => {
  const allowedIds = new Set(
    modelOptionValues.map((modelValue) => modelValue.option_value_id)
  );

  return optionValues.filter((value) => allowedIds.has(value.id));
}, [optionValues, modelOptionValues]);

const groupedOptionValues = useMemo(() => {
  const groups: Record<string, OptionValues[]> = {};

  availableOptionValues.forEach((value) => {
    if (!groups[value.option_group_id]) {
      groups[value.option_group_id] = [];
    }

    groups[value.option_group_id].push(value);
  });

  Object.values(groups).forEach((values) => {
    values.sort((a, b) => a.display_order - b.display_order);
  });

  return groups;
}, [availableOptionValues]);

useEffect(() => {
  if (!optionGroups.length || !Object.keys(groupedOptionValues).length) return;

  setSelectedOptions((prev) => {
    const newSelections = { ...prev };
    optionGroups.forEach((group) => {
      if (group.input_type !== "single" && group.input_type !== "toggle") return;
      const values = groupedOptionValues[group.id];
      if (!values || values.length === 0) return;
      if (newSelections[group.id]?.length) return;
      if (group.input_type === "single") {
        newSelections[group.id] = [values[0].id];
      }
     if (group.input_type === "toggle") {
        newSelections[group.id] = [values[values.length - 1].id];
      }
    });

    return newSelections;
  });
}, [optionGroups, groupedOptionValues]);

const isSelected = (valueId: string) => {
  return Object.values(selectedOptions).some((values) =>
    values.includes(valueId)
  );
};

const handleOptionClick = (
  group: OptionGroups,
  valueId: string
) => {
  setSelectedOptions((prev) => {
    const current = prev[group.id] || [];

    if (group.slug === "front_wall") {
      const showFrontWallGroup = optionGroups.find(
        (group) => group.slug === "show_front_wall"
      );

      if (showFrontWallGroup) {
        const showFrontWallValues =
          groupedOptionValues[showFrontWallGroup.id] || [];

        const yesValue = showFrontWallValues.find(
          (value) => value.slug === "yes"
        );

        return {
          ...prev,
          [group.id]: [valueId],
          ...(yesValue
            ? {
                [showFrontWallGroup.id]: [yesValue.id],
              }
            : {}),
        };
      }

      return {
        ...prev,
        [group.id]: [valueId],
      };
    }

    if (group.input_type === "single") {
      if (current.includes(valueId)) {
        return prev;
      }

      return {
        ...prev,
        [group.id]: [valueId],
      };
    }

    if (group.input_type === "multiple") {
      return {
        ...prev,
        [group.id]: current.includes(valueId)
          ? current.filter((id) => id !== valueId)
          : [...current, valueId],
      };
    }

    if (group.input_type === "toggle") {
      const yesValue = groupedOptionValues[group.id]?.find((value) => value.slug === "yes");
      const noValue = groupedOptionValues[group.id]?.find((value) => value.slug === "no");
      const currentlyYes = current[0] === yesValue?.id;

      return {
        ...prev,
        [group.id]: [currentlyYes ? noValue?.id : yesValue?.id].filter(Boolean) as string[],
      };
    }

    return prev;
  });
};
  const selectedLayerImages = useMemo(() => {
    const selectedValueIds = new Set( Object.values(selectedOptions).flat());

    const frontWallGroup = optionGroups.find((group) => group.slug === "front_wall");
    const showFrontWallGroup = optionGroups.find((group) => group.slug === "show_front_wall");
    const selectedShowFrontWallId = showFrontWallGroup ? selectedOptions[showFrontWallGroup.id]?.[0] : null;
    const selectedShowFrontWallValue = optionValues.find((value) => value.id === selectedShowFrontWallId);
    const showFrontWall = selectedShowFrontWallValue?.slug === "yes";

    return optionLayers.filter((layer) => {
    if (!selectedValueIds.has(layer.option_value_id)) {
      return false;
    }

    const optionValue = optionValues.find(
      (value) => value.id === layer.option_value_id
    );

    if (!optionValue) {
      return false;
    }

    if (optionValue.slug === "no") {
      return false;
    }

     if (frontWallGroup && optionValue.option_group_id === frontWallGroup.id) {
      return showFrontWall;
    }

     return true;
    });
  }, [optionLayers, optionValues,optionGroups, selectedOptions]);

  const formatDimensions = (dimensions: string | null) => {
  if (!dimensions) return "-";
  const [d, w, h] = dimensions.split("x");

  return `D ${d} x W ${w} x H ${h}`;
  };

  const selectedOptionValues = useMemo(() => {
  const selectedIds = new Set(
    Object.values(selectedOptions).flat()
  );

  const showFrontWallGroup = optionGroups.find(
    (group) => group.slug === "show_front_wall"
  );

  return optionValues.filter(
    (value) =>
      selectedIds.has(value.id) &&
      value.option_group_id !== showFrontWallGroup?.id
  );
}, [optionValues, optionGroups, selectedOptions]);

  const getOptionPrice = (valueId: string) => {
    const modelOption = modelOptionValues.find(
     (item) => item.option_value_id === valueId
    );

    return Number(modelOption?.price || 0);
  };

  const basePrice = Number(saunaModel?.price || 0);
  const optionsPrice = selectedOptionValues.reduce((total, value) => total + getOptionPrice(value.id),0);
  const totalPrice = basePrice + optionsPrice;

  const handleGoToCart = () => {
    const newErrors = {
      name: !userInput.name.trim(),
      email: !userInput.email.trim(),
      country: !userInput.country,
      additionalComments: !userInput.additionalComments.trim(),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.country || newErrors.additionalComments) return;
    const cartData = {
      userInput,
      model: {
        id: saunaModel?.id,
        model_name: saunaModel?.model_name,
        price: basePrice,
      },
      selectedOptions: selectedOptionValues.map((value) => ({
        id: value.id,
        name: value.name,
        option_group_id: value.option_group_id,
        price: getOptionPrice(value.id),
      })),
      optionsPrice,
      totalPrice,
    };
      sessionStorage.setItem(
      "saunaCartData",
      JSON.stringify(cartData)
    );

    navigate("/cart");
  }





  return (
    <div className="bg-[#F7F5EF] pt-20 pb-[100px]">
      <h2 className='flex px-[270px] py-[80px] pb-[20px] text-[20px] text-[#313C2B]' style={{ fontFamily: "noah-bold, sans-serif" }}>Configure & Get a quote</h2>
      <div className="w-full h-[1px] bg-[#C6C0AF]" />
      
      {saunaModel && (
        <div className="relative flex w-full">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#C6C0AF] z-10" />
       <div className="pl-[270px] pr-[90px] pt-[40px] flex flex-col text-[#313C2B] space-y-6 w-1/2">
        <span className="text-[36px]" style={{ fontFamily: "sogo-light, sans-serif" }}>{saunaModel.model_name}</span>
        <span className="text-[20px]" style={{ fontFamily: "noah-regular, sans-serif" }}>{saunaModel.model_description}</span>
        <ul className="flex gap-5 mt-2">
          <li className="text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
            <MdPeopleAlt className="inline mr-2 mb-1 w-5 h-5 text-[#778658]" />
            {saunaModel.people} People
          </li>
          <li className="text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
            <HiMiniCube className="inline mr-2 mb-1 w-5 h-5 text-[#778658]" />
            {saunaModel.area_m2} m²
          </li>
          <li className="text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
            <IoMdHome className="inline mr-2 mb-1 w-5 h-5 text-[#778658]" />
            {saunaModel.rooms}
          </li>
        </ul>
        <a href={saunaModel.product_sheet_pdf_url} download target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#F7F5EF] hover:bg-[#C6C0AF] transition-colors duration-500 text-[#313C2B] border border-[#C6C0AF] rounded-[8px] text-center flex items-center justify-center" style={{ fontFamily: "noah-bold, sans-serif" }}>
          <MdOutlineFileDownload className="inline mr-2 mb-[2px] w-6 h-6" />
          Download product sheet
        </a>
        <div className="w-[calc(100%+90px)] h-[1px] bg-[#C6C0AF] mt-4"/>
        <div className="space-y-6 ">
          {optionGroups.filter((group) => groupedOptionValues[group.id]?.length > 0).map((group) => (
            <div key={group.id} className={`pb-6  w-[calc(100%+90px)] ${group.slug !== "front_wall" ? "border-b border-[#C6C0AF]" : ""}`}>
              <div className={ group.input_type === "toggle" ? "flex items-center justify-between pr-[40px]" : ""}>
              <h3 className="text-[16px] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>{group.name}</h3>
              <div className="flex flex-wrap gap-4">
                {group.input_type === "toggle" ? (
                   <div className="flex items-center gap-1 bg-[#313C2B] border border-[#C6C0AF] rounded-[10px] p-1">
                     {groupedOptionValues[group.id].map((value) => {
                      const isValueSelected = isSelected(value.id);
                      return (
                        <button key={value.id} onClick={() => handleOptionClick(group, value.id)} className={`w-[44px] h-[36px] flex items-center justify-center rounded-[6px] transition-colors duration-300 cursor-pointer ${ isValueSelected ? "bg-[#F7F5EF]" : "bg-transparent" }`}> 
                          {value.slug === "yes" ? (
                            <MdOutlineDone className="w-6 h-6 text-[#778658]" />
                          ) : (
                            <LuX className="w-6 h-6 text-[#8E573D]" />
                          )}
                        </button>
                    );
                  })}
              </div>          
                ) : (
                groupedOptionValues[group.id].map((value) => (
                  <button key={value.id} onClick={() => handleOptionClick(group, value.id)} className={`px-4.5 py-2 rounded-[10px] border transition cursor-pointer flex flex-row items-center justify-center gap-2 ${ isSelected(value.id) ? "bg-[#313C2B] text-white border-[#313C2B]" : "bg-[#F7F5EF] text-[#313C2B] border-[#C6C0AF] hover:bg-[#C6C0AF]" }`} style={{ fontFamily: "noah-bold, sans-serif" }}>
                    {value.name}
                  </button>
                ))
                )}
              </div>
            </div>
            </div>
          ))}
        </div>
        {/* size */}
        <div>
          <h3 className="text-[16px] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>Size</h3>
          <div className="flex items-center gap-1 bg-[#313C2B] border border-[#C6C0AF] rounded-[10px] p-1 w-fit">
            <button onClick={() => setSizeUnit("EU")} className={`w-[44px] h-[36px] flex items-center justify-center rounded-[6px] transition-colors duration-300 cursor-pointer ${sizeUnit === "EU" ? "bg-[#F7F5EF] text-[#92988F]" : "bg-transparent text-[#92988F]" }`} style={{ fontFamily: "noah-bold, sans-serif" }}>
              EU
            </button>
            <button onClick={() => setSizeUnit("US")} className={`w-[44px] h-[36px] flex items-center justify-center rounded-[6px] transition-colors duration-300 cursor-pointer ${sizeUnit === "US" ? "bg-[#F7F5EF] text-[#92988F]" : "bg-transparent text-[#92988F]" }`} style={{ fontFamily: "noah-bold, sans-serif" }}>
              US
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="flex flex-col ">
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>{sizeUnit === "EU" ? "Exterior (mm)" : "Exterior (in)"}:</span>
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                {formatDimensions(sizeUnit === "EU" ? saunaModel.exterior_mm : saunaModel.exterior_in)}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>{sizeUnit === "EU" ? "Interior (mm)" : "Interior (in)"}:</span>
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                {formatDimensions(sizeUnit === "EU" ? saunaModel.interior_mm : saunaModel.interior_in)}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>{sizeUnit === "EU" ? "Weight (kg)" : "Weight (lbs)"}:</span>
              <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                {sizeUnit === "EU" ? saunaModel.weight_kg : saunaModel.weight_lbs}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[calc(100%+90px)] h-[1px] bg-[#C6C0AF] mt-4"/>

        <div className="pt-10">
          <h3 className="text-[20px] text-[#313C2B] mb-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
            We’re here for you!
          </h3>
          <p className="text-[16px] text-[#313C2B] mb-8" style={{ fontFamily: "noah-regular, sans-serif" }}>
            Send your specific wishes to us and we will reply to you as soon as possible.
          </p>

          <div className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <input id="name" type="text" value={userInput.name} onChange={(e) => setUserInput((prev) => ({
                ...prev,name:e.target.value,
              }))}
              className={`w-full rounded-[6px] border ${errors.name ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}
              />
              {errors.name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div>
              <label htmlFor="contact-email" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <input id="email" type="email" value={userInput.email} onChange={(e) => setUserInput((prev) => ({
                ...prev,email:e.target.value,
              }))}
              className={`w-full rounded-[6px] border ${errors.email ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}
              />
              {errors.email && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div>
              <label htmlFor="contact-country" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Country <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
              <select id="country" value={userInput.country} onChange={(e) => setUserInput((prev) => ({
                ...prev,country:e.target.value,
              }))}
              className={`w-full appearance-none rounded-[6px] border ${errors.country ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}>

                <option value="">Select country</option>
                {country.map((item) => (<option key={item.id} value={item.name}> {item.name} </option>))} 
              </select>
              {errors.country && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div>
              <label htmlFor="contact-phone"  className="block text-[22px] text-[#313C2B] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
                 Phone/Mobile
              </label>

              <input id="contact-phone" placeholder="optional - for faster response on your quote" type="tel" value={userInput.phone} onChange={(e) => setUserInput((prev) => ({  ...prev, phone: e.target.value,}))}
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
               />
            </div>

            <div className="pt-2">
               <h3 className="text-[20px] text-[#313C2B] mb-5" style={{ fontFamily: "noah-regular, sans-serif" }}>
                Requested Info
               </h3>

               <div className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                    Product: {saunaModel.model_name}
                  </span>
                  <span className="text-[16px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>
                    ${basePrice.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                    {selectedOptionValues.map((value) => {
                      const price = getOptionPrice(value.id);
                      const group = optionGroups.find( (group) => group.id === value.option_group_id );
                      
                      return (
                        <div key={value.id} className="flex items-center justify-between">
                          <span className="text-[15px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                            {group?.name}: {value.name}
                          </span>
                          <span className="text-[15px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                            {price > 0 ? `+$${price.toLocaleString("en-US")}`: "$0"}
                          </span>
                        </div>
                      );
                    })}
               </div>
               <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#C6C0AF]">
                <span className="text-[17px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                  Total
                </span>
                <span className="text-[19px] text-[#313C2B]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                  ${totalPrice.toLocaleString("en-US")}
                </span>
               </div>
               </div>
            </div>

            <div>
              <label htmlFor="additional-comments" className="block text-[22px] text-[#313C2B] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
                 Additional comments <span className="text-red-500 w-2 h-2 ml-[1px]">*</span>
              </label>

              <textarea id="additional-comments" value={userInput.additionalComments} onChange={(e) => setUserInput((prev) => ({  ...prev, additionalComments: e.target.value,}))}
                rows={4} className={`w-full rounded-[6px] border ${ errors.additionalComments ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200 resize-none`}
               />
               {errors.additionalComments && (<span className="text-red-500 text-[11px]">This field is required</span>)}
            </div>

            <div>
             <button type="button" onClick={handleGoToCart} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer" style={{ fontFamily: "noah-bold, sans-serif" }}>
                Go to Cart
              </button>
            </div>

          </div>
        </div>

       </div>
      <div className="relative z-0 w-[700px] h-[700px] sticky top-[101px] bg-[#EDE9DD] flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {saunaImages.length > 0 && (
            <img src={saunaImages[0].image_url} alt={saunaModel.model_name} className="absolute inset-0 w-full h-full object-contain"/>)}

          {selectedLayerImages.map((layer) => (
            <img key={layer.id} src={layer.image_url} alt={layer.layer_name ?? ""} className="absolute inset-0 w-full h-full object-contain pointer-events-none"/>
          ))}
        </div>
       </div>
      </div>
      )}
    </div>
  )
}
