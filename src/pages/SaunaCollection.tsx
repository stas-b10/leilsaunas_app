import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { Collection } from "../utils/types/collection";
import type { SaunaModel } from "../utils/types/saunaModel";

export default function SaunaCollection() {
  const { collection } = useParams();

  const [saunas, setSaunas] = useState<SaunaModel[]>([]);
  const [collectionInfo, setCollectionInfo] =
    useState<Collection | null>(null);

  useEffect(() => {
    if (!collection) return;

    const collectionName =
      collection.charAt(0).toUpperCase() +
      collection.slice(1).toLowerCase();

    const fetchData = async () => {
      const { data: collectionData } = await supabase
        .from("collections")
        .select("*")
        .eq("collection_name", collectionName)
        .single();

      if (collectionData) {
        setCollectionInfo(collectionData);
      }

      const { data: saunasData } = await supabase
        .from("sauna_models")
        .select("*")
        .eq("series_id", collectionData?.id); 

      setSaunas(saunasData || []);
    };

    fetchData();
  }, [collection]);

  return (
    <section className="bg-[#F7F5F0] min-h-screen py-[140px]">
      <div className="max-w-[1400px] mx-auto px-[80px]">
        <h1
          className="text-[64px] text-[#313C2B]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          {collectionInfo?.collection_name}
        </h1>

        <p
          className="mt-6 max-w-[700px] text-[20px] text-[#313C2B]"
          style={{ fontFamily: "noah-regular, sans-serif" }}
        >
          {collectionInfo?.description}
        </p>

        <div className="mt-20 grid grid-cols-3 gap-6">
          {saunas.map((sauna) => (
            <div
              key={sauna.id}
              className="overflow-hidden rounded-[12px] bg-white"
            >
              <img
                src={sauna.image_url || "/placeholder.jpg"}
                alt={sauna.model_name}
                className="h-[420px] w-full object-cover"
              />

              <div className="p-6">
                <h3
                  className="text-[24px] text-[#313C2B]"
                  style={{ fontFamily: "sogo-light, sans-serif" }}
                >
                  {sauna.model_name}
                </h3>

                <p className="text-[14px] text-[#666] mt-2">
                  {sauna.people} people • {sauna.area_m2} m²
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}