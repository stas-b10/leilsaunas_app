import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useParams } from "react-router-dom";

export default function Saunas() {
  const { categorySlug } = useParams();

  const [saunas, setSaunas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaunas = async () => {
      if (!categorySlug) return;

      setLoading(true);

      const { data: category } = await supabase
        .from("categories")
        .select("id, category_name")
        .eq("slug", categorySlug)
        .maybeSingle();

      if (!category) {
        setSaunas([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("series")
        .select("*")
        .eq("category_id", category.id);

      if (error) {
        console.error(error);
        setSaunas([]);
      } else {
        setSaunas(data || []);
      }

      setLoading(false);
    };

    fetchSaunas();
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold capitalize">
          {categorySlug?.replace("-", " ")}
        </h1>
        <p className="text-gray-400 mt-2">
          Explore premium sauna series in this category
        </p>
      </div>

      {loading && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white/5 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}

      {!loading && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saunas.map((item) => (
            <div
              key={item.id}
              className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold group-hover:text-white">
                {item.series_name}
              </h2>

              <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                {item.series_description || "No description available."}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>
                  Created {new Date(item.created_at).toLocaleDateString()}
                </span>

                <span className="px-2 py-1 rounded-md bg-white/10">
                  Series
                </span>
              </div>

              <button className="mt-4 w-full py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition">
                View Models
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && saunas.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No sauna series found in this category.
        </div>
      )}
    </div>
  );
}