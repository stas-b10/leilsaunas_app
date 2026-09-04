import { useState, useEffect, useMemo } from "react";
import { supabase } from "../utils/supabase";
import type { OptionGroups } from '../utils/types/option_groups'
import type { SaunaModel } from '../utils/types/sauna_models'
import type { SaunaImages } from '../utils/types/sauna_images'
import type { OptionValues } from '../utils/types/option_value'
import type { OptionLayers } from '../utils/types/option_layers'
import type { ModelOptionValues } from '../utils/types/model_option_values'
import { useParams } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { HiMiniCube } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { LuX } from "react-icons/lu";

export default function SaunaModels() {
  const { model_slug } = useParams<{ model_slug: string }>();

  const [saunaModel, setSaunaModel] = useState<SaunaModel | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroups[]>([]);
  const [optionValues, setOptionValues] = useState<OptionValues[]>([]);
  const [optionLayers, setOptionLayers] = useState<OptionLayers[]>([]);
  const [modelOptionValues, setModelOptionValues] = useState<ModelOptionValues[]>([]);
  const [saunaImages, setSaunaImages] = useState<SaunaImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

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

        const[optionGroupsResult, optionValuesResult, optionLayersResult, modelOptionValuesResult, saunaImagesResult] = await Promise.all([
          supabase.from("option_groups").select("*").order("display_order", { ascending: true }),
          supabase.from("option_values").select("*").order("display_order", { ascending: true }),
          supabase.from("option_layers").select("*").eq("model_id", saunaModelData.id).order("display_order", { ascending: true }),
          supabase.from("model_option_values").select("*").eq("model_id", saunaModelData.id),
          supabase.from("sauna_model_images").select("*").eq("model_id", saunaModelData.id).order("display_order", { ascending: true }),
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

        setOptionGroups(optionGroupsResult.data || []);
        setOptionValues(optionValuesResult.data || []);
        setOptionLayers(optionLayersResult.data || []);
        setModelOptionValues(modelOptionValuesResult.data || []);
        setSaunaImages(saunaImagesResult.data || []);
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

  return (
    <div className="bg-[#F7F5EF] pt-20">
      <h2 className='flex px-[270px] py-[80px] pb-[20px] text-[20px] text-[#313C2B]' style={{ fontFamily: "noah-bold, sans-serif" }}>Configure & Get a quote</h2>
      <div className="w-full h-[1px] bg-[#C6C0AF]" />
      {saunaModel && (
        <div className="flex w-full">
       <div className="pl-[270px] pr-[60px] pt-[40px] flex flex-col text-[#313C2B] space-y-6 w-1/2">
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
        <div className="w-[calc(100%+40px)] h-[1px] bg-[#C6C0AF] mt-4"/>
        <div className="space-y-6">
          {optionGroups.filter((group) => groupedOptionValues[group.id]?.length > 0).map((group) => (
            <div key={group.id} className={`pb-6 w-[calc(100%+40px)] ${group.slug !== "front_wall" ? "border-b border-[#C6C0AF]" : ""}`}>
              <div className={ group.input_type === "toggle" ? "flex items-center justify-between" : ""}>
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
        <div className="w-[calc(100%+40px)] h-[1px] bg-[#C6C0AF] mt-4"/>
       </div>
      <div className="w-[700px] h-[700px] sticky top-[101px] bg-[#EDE9DD] flex items-center justify-center overflow-hidden">
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
