import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

import type { Collection } from "../utils/types/collection";
import type { Series } from "../utils/types/series";

export default function SaunaCollection() {
  const { slug } = useParams<{ slug: string }>();

  const [collectionInfo, setCollectionInfo] = useState<Collection | null>(null);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      // Get collection
      const { data: collectionData, error: collectionError } = await supabase
        .from("collections")
        .select("*")
        .eq("slug", slug)
        .single();

      if (collectionError || !collectionData) {
        console.error(collectionError);
        return;
      }

      setCollectionInfo(collectionData);

      // Get series for this collection
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select("*")
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
          {series.map((item) => (
            <Link
              key={item.id}
              to={`/series/${item.slug}`}
              className="rounded-xl bg-white p-8 hover:shadow-lg transition duration-300"
            >
              <h2
                className="text-[34px] text-[#313C2B]"
                style={{ fontFamily: "sogo-light, sans-serif" }}
              >
                {item.series_name}
              </h2>

              <p
                className="mt-4 text-[#666]"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                {item.series_description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}