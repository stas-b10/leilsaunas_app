import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { Series } from "../utils/types/series";
import { Link } from "react-router-dom";
import saunaForest from "../assets/images/saunaForest.webp"
import FaqFooter from "../components/FaqFooter";

export default function SeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase.from("series").select("*,collection:collection_id (collection_name),category:category_id (category_name)").order("display_order",{ascending:true});
      

      if (error) {
        console.error(error);
        return;
      }

      setSeriesList(data || []);
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDE9DF]">
    <section className="w-full mb-16">

          <div className="relative w-full h-[530px] overflow-hidden">

            <img
              src={saunaForest}
              alt="saunaForest"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-20 left-6 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[650px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Find your calm. Uniquely yours.
                </p>

                <p className="w-[450px] text-[20px] leading-relaxed mb-4">
                  <strong style={{ fontFamily: "noah-bold, sans-serif" }}>High-quality premium class saunas.</strong>
                  <span className="block text-[#EDE9DF]" style={{ fontFamily: "noah-regular, sans-serif" }}>Scroll to learn more.</span>
                </p>
              </div>
            </div>

          </div>

        </section>

    <section className="w-full max-w-[1440px] mx-auto px-6 pb-[100px]">
      <div className="max-w-[1400px] mx-auto">
        <h1
          className="text-[44px] text-[#313C2B] mb-8"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          Series
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          {seriesList.map((series) => (
            <div key={series.id}>
            <Link
              to={`/series/${series.slug}`}
              className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition block"
            >
              <div className="relative overflow-hidden rounded-lg cursor-pointer">
                <img src={series.image_url ?? ""} alt={series.series_name} className="w-full h-[380px] object-cover"
              />
                <div className="absolute top-5 right-5 flex gap-3">
                  {series.collection?.collection_name && (
                  <span className="px-[25px] py-[12px] rounded-full bg-white/10 text-[19px] text-white backdrop-blur-sm border border-white/20" style={{ fontFamily: "noah-bold, sans-serif" }} >
                    {series.collection.collection_name}
                  </span>
                    )}
                    {series.category?.category_name && (
                  <span className="px-[27px] py-[12px] rounded-full bg-white/10 text-[19px] text-white backdrop-blur-sm border border-white/20" style={{ fontFamily: "noah-bold, sans-serif" }}>
                    {series.category.category_name}
                  </span>
                    )}
                </div>
              </div>
            </Link>
              <div className="mt-8">
               <h2 className="text-[36px] text-[#313C2B]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                {series.series_name}
                </h2>
                <p className="mt-2 text-[16px] text-[#313C2B] max-w-[500px]" style={{ fontFamily: "noah-regular, sans-serif" }}>
                  {series.series_description}
                </p>
                <Link to={`/series/${series.slug}`}>
                  <button className="mt-10 px-4 py-2 rounded-md border border-[#C7BEAB] hover:border-[#313C2B] hover:bg-[#313C2B] hover:text-white transition cursor-pointer"
                          style={{ fontFamily: "noah-bold, sans-serif" }}>
                    More info
                  </button>
            </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      <FaqFooter />
    </div>
  );
}