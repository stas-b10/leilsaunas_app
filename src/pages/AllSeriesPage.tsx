import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { Series } from "../utils/types/series";
import { Link } from "react-router-dom";

export default function SeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase.from("series").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setSeriesList(data || []);
    };

    fetchAll();
  }, []);

  return (
    <section className="bg-[#F7F5F0] min-h-screen py-[140px]">
      <div className="max-w-[1400px] mx-auto px-[80px]">
        <h1
          className="text-[64px] text-[#313C2B]"
          style={{ fontFamily: "sogo-light, sans-serif" }}
        >
          All Series
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {seriesList.map((series) => (
            <Link
              key={series.id}
              to={`/series/${series.slug}`}
              className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition block"
            >
              <div className="p-6">
                <h3
                  className="text-[26px]"
                  style={{ fontFamily: "sogo-light, sans-serif" }}
                >
                  {series.series_name}
                </h3>

                <p
                  className="mt-2 text-[#666]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  {series.series_description?.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}