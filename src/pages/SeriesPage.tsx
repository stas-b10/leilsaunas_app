import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { SaunaModel } from "../utils/types/saunaModel";
import type { Series } from "../utils/types/series";

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>();

  const [series, setSeries] = useState<Series | null>(null);
  const [models, setModels] = useState<SaunaModel[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select("*")
        .eq("slug", slug)
        .single();

      if (seriesError || !seriesData) {
        console.error("Series error:", seriesError);
        return;
      }

      setSeries(seriesData);

      const { data: saunaData, error: saunaError } = await supabase
        .from("sauna_models")
        .select("*")
        .eq("series_id", seriesData.id);

      if (saunaError) {
        console.error("Sauna models error:", saunaError);
        return;
      }

      setModels(saunaData || []);
    };

    fetchData();
  }, [slug]);

  return (
    <section className="bg-[#F7F5F0] min-h-screen py-[140px]">
      <div className="max-w-[1400px] mx-auto px-[80px]">
        <h1
          className="text-[64px] text-[#313C2B]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          {series?.series_name}
        </h1>

        <p
          className="mt-6 text-[#666]"
          style={{ fontFamily: "noah-regular, sans-serif" }}
        >
          {series?.series_description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {models.map((model) => (
            <div
              key={model.id}
              className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <img
                src={model.image_url || "/placeholder.jpg"}
                alt={model.model_name}
                className="h-[380px] w-full object-cover"
              />

              <div className="p-6">
                <h3
                  className="text-[26px]"
                  style={{ fontFamily: "sogo-light, sans-serif" }}
                >
                  {model.model_name}
                </h3>

                <p
                  className="mt-2 text-[#666]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  {model.people} people • {model.area_m2} m²
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}