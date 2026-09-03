import { useState,useEffect } from 'react'
import { supabase } from "../utils/supabase";
import type { OptionGroups } from '../utils/types/option_groups'
import type { SaunaModel } from '../utils/types/sauna_models'
import type { SaunaImages } from '../utils/types/sauna_images'
import type { OptionValues } from '../utils/types/option_value'
import type { OptionLayers } from '../utils/types/option_layers'
import type { ModelOptionValues } from '../utils/types/model_option_values'
import { useParams } from "react-router-dom";

export default function SaunaModels() {
  const { slug } = useParams<{ slug: string }>();

  const [saunaModel, setSaunaModel] = useState<SaunaModel | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroups[]>([]);
  const [optionValues, setOptionValues] = useState<OptionValues[]>([]);
  const [optionLayers, setOptionLayers] = useState<OptionLayers[]>([]);
  const [modelOptionValues, setModelOptionValues] = useState<ModelOptionValues[]>([]);
  const [saunaImages, setSaunaImages] = useState<SaunaImages[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data: saunaModelData, error: saunaModelError } = await supabase
          .from("sauna_models")
          .select("*")
          .eq("slug", slug)
          .single();

        if (saunaModelError || !saunaModelData) {
          console.error("Sauna model error:", saunaModelError);
          return;
        }
        
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

        setSaunaModel(saunaModelData);
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
  }, [slug]);

  return (
    <div>
      
    </div>
  )
}
