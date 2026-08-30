import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { SaunaModel } from "../utils/types/saunaModel";
import type { Series } from "../utils/types/series";
import LeafIcon from "../components/LeafIcon";

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
    <div className="min-h-screen bg-[#EDE9DF]">
      {series && (
        <section className="w-full mb-16">

          <div className="relative w-full h-[520px] overflow-hidden">

            <img
              src={series.image_url}
              alt={series.series_name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-8 left-10 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[650px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  {series.series_name}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}  

      {series && (
        <section className="pl-6 md:pl-64 pr-6 pt-[30px]">
          <div className="flex items-start gap-8">
            <div className="w-[920px] space-y-4">
          <h1
            className="text-[20px] text-[#313C2B]  max-w-[900px]"
            style={{ fontFamily: "noah-bold, sans-serif" }}
          >
            {series.series_description}
          </h1>
          <p
            className="text-[20px] text-[#313C2B] max-w-[880px]"
            style={{ fontFamily: "noah-regular, sans-serif" }}
            >
            {series.description}
          </p>
          </div>
          <div className="w-[420px] shrink-0">
            <img src={series.img_no_wall} alt={series.series_name} className="w-full h-auto" />
          </div>
          </div>
        </section>
      )}

      {series && models && (
        <section className="px-[260px] py-[240px] -mt-24">
        <div className="flex items-center gap-2 mb-12 opacity-90 text-[16px]"
             style={{ fontFamily: "noah-bold, sans-serif" }}
        >
          <LeafIcon className="w-[12px] h-[12px]" />
            <span>choose what suits you the best.</span>
        </div>
        </section>
      )}
    </div>
  );
}