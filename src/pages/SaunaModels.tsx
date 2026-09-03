import { useState,useEffect } from 'react'
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

export default function SaunaModels() {
  const { model_slug } = useParams<{ model_slug: string }>();

  const [saunaModel, setSaunaModel] = useState<SaunaModel | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroups[]>([]);
  const [optionValues, setOptionValues] = useState<OptionValues[]>([]);
  const [optionLayers, setOptionLayers] = useState<OptionLayers[]>([]);
  const [modelOptionValues, setModelOptionValues] = useState<ModelOptionValues[]>([]);
  const [saunaImages, setSaunaImages] = useState<SaunaImages[]>([]);
  const [loading, setLoading] = useState(false);

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
        
        const { data: optionGroupsData, error: optionGroupsError } = await supabase
          .from("option_groups")
          .select("*")
          .order("display_order", { ascending: true });
          
        if (optionGroupsError) {
          console.error("Option groups error:", optionGroupsError);
          return;
        }

        const { data: optionValuesData, error: optionValuesError } = await supabase
          .from("option_values")
          .select("*")
          .order("display_order", { ascending: true });
          
        if (optionValuesError) {
          console.error("Option values error:", optionValuesError);
          return;
        }

        const { data: optionLayersData, error: optionLayersError } = await supabase
          .from("option_layers")
          .select("*")
          .eq("model_id", saunaModelData.id)
          .order("display_order", { ascending: true });

        if (optionLayersError) {
          console.error("Option layers error:", optionLayersError);
          return;
        }

        const { data: modelOptionValuesData, error: modelOptionValuesError } = await supabase
          .from("model_option_values")
          .select("*")
          .eq("model_id", saunaModelData.id);

        if (modelOptionValuesError) {
          console.error("Model option values error:", modelOptionValuesError);
          return;
        }

        const { data: saunaImagesData, error: saunaImagesError } = await supabase
          .from("sauna_model_images")
          .select("*")
          .eq("model_id", saunaModelData.id)
          .order("display_order", { ascending: true });

        if (saunaImagesError) {
          console.error("Sauna images error:", saunaImagesError);
          return;
        }

        
        setOptionGroups(optionGroupsData || []);
        setOptionValues(optionValuesData || []);
        setOptionLayers(optionLayersData || []);
        setModelOptionValues(modelOptionValuesData || []);
        setSaunaImages(saunaImagesData || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model_slug]);

  return (
    <div className="bg-[#F7F5EF] pt-20">
      <h2 className='flex px-[270px] py-[80px] pb-[20px] text-[20px] text-[#313C2B]' style={{ fontFamily: "noah-bold, sans-serif" }}>Configure & Get a quote</h2>
      <div className="w-full h-[1px] bg-[#C6C0AF]" />
      {saunaModel && (
       <div className="px-[270px] pt-[40px] flex flex-col text-[#313C2B] space-y-6 max-w-[1180px]">
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
       </div>
      )}
    </div>
  )
}
