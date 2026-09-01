import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { Collection } from "../utils/types/collection";
import type { Series } from "../utils/types/series";
import LeafIcon from "../components/LeafIcon";
import FaqFooter from "../components/FaqFooter";
import FooterSlide from "../components/FooterSlide";

export default function SaunaCollection() {
  const { slug } = useParams<{ slug: string }>();

  const [collectionInfo, setCollectionInfo] = useState<Collection | null>(null);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const { data: collectionData, error: collectionError } = await supabase
        .from("collections")
        .select("*")
        .eq("slug", slug)
        .single();

      if (collectionError || !collectionData) {
        console.error(collectionError);
        return;
      }
      console.log("COLLECTION FROM SUPABASE:", collectionData);
      console.log("IMAGE URL:", collectionData.image_url);

      setCollectionInfo(collectionData);

      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select(`*, collection:collection_id ( collection_name ),category:category_id ( category_name )`)
        .eq("collection_id", collectionData.id)
        .order("series_name");

      if (seriesError) {
        console.error(seriesError);
        return;
      }

      setSeries(seriesData || []);
    };

    fetchData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#EDE9DF]">
    {collectionInfo && (
    <section className="w-full mb-16">
      <div className="relative w-full h-[530px] overflow-hidden">

        <img src={collectionInfo.image_url ?? ""} alt={collectionInfo.collection_name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-19 left-10 md:left-64 text-white">
              <div className="flex items-end gap-16 max-w-[1400px]">
                <p className="w-[650px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Find your calm. Uniquely yours.
                </p>

                <p className="w-[450px] text-[20px] mb-2">
                  <strong style={{ fontFamily: "noah-bold, sans-serif" }}>High-quality premium class saunas.</strong>
                  <span className="block text-[#C6C0AF]" style={{ fontFamily: "noah-regular, sans-serif" }}>Scroll to learn more.</span>
                </p>
              </div>
            </div>

          </div>
    </section>
    )}
    {collectionInfo && (
      <section className="pl-6 md:pl-64 pr-6 mb-20">
          <h1
            className="text-[44px] text-[#313C2B] mb-6"
            style={{ fontFamily: "sogo-light, sans-serif" }}
          >
            {collectionInfo.collection_name} Collection
          </h1>
          <div className="flex items-center gap-2 text-[#313C2B] text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
           <LeafIcon className="w-[12px] h-[12px]" />
             explore our saunas.
          </div>
        </section>
    )}

    <section className="w-full max-w-[1440px] mx-auto px-6 pb-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
    {series.map((item) => (
      <div key={item.id}>
        <Link to={`/series/${item.slug}`}>
         <div className="relative overflow-hidden rounded-lg cursor-pointer">
          <img src={item.image_url} alt={item.series_name} className="w-full h-[380px] object-cover" /> 
           <div className="absolute top-5 right-5 flex gap-3">
          <span className="px-[25px] py-[12px] rounded-full bg-white/10 text-[19px] text-white backdrop-blur-sm border border-white/20" style={{ fontFamily: "noah-bold, sans-serif" }} >
          {item.collection?.collection_name}
          </span>
          <span className="px-[27px] py-[12px] rounded-full bg-white/10 text-[19px] text-white backdrop-blur-sm border border-white/20" style={{ fontFamily: "noah-bold, sans-serif" }}>
          {item.category?.category_name}
          </span>
        </div>
      </div>
    </Link>
      <div className="mt-8">
        <h2
          className="text-[36px] text-[#313C2B]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          {item.series_name}
        </h2>
        <p
          className="mt-2 text-[16px] text-[#313C2B] max-w-[500px]"
          style={{ fontFamily: "noah-regular, sans-serif" }}
        >
          {item.series_description}
        </p>
        <Link to={`/series/${item.slug}`}>
        <button
          className="mt-10 px-4 py-2 rounded-md border border-[#C7BEAB] hover:border-[#313C2B] hover:bg-[#313C2B] hover:text-white transition cursor-pointer"
          style={{ fontFamily: "noah-bold, sans-serif" }}
        >
          More info
        </button>
        </Link>
      </div>
      </div>
      ))}
      </div>
    </section>
       <FooterSlide />
      <FaqFooter />
    </div>
  );
}