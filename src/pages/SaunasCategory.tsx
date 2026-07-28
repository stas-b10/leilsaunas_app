import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useParams } from "react-router-dom";
import LeafIcon from "../components/LeafIcon";
import FilterSaunas from "../components/FilterSaunas";
import { LuSettings2 } from "react-icons/lu";

export default function Saunas() {
  const { categorySlug } = useParams();

  const [category, setCategory] = useState<any>(null);
  const [saunas, setSaunas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSaunas = async () => {
      if (!categorySlug) return;

      setLoading(true);

      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", categorySlug)
        .maybeSingle();

      if (categoryError || !categoryData) {
        console.error(categoryError);
        setCategory(null);
        setSaunas([]);
        setLoading(false);
        return;
      }

      setCategory(categoryData);

      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select("*")
        .eq("category_id", categoryData.id)
        .order("series_name");

      if (seriesError) {
        console.error(seriesError);
        setSaunas([]);
      } else {
        setSaunas(seriesData || []);
      }

      setLoading(false);
    };

    fetchSaunas();
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-[#EDE9DF]">

      {category && (
        <section className="w-full mb-16">

          <div className="relative w-full h-[530px] overflow-hidden">

            <img
              src={category.image_url}
              alt={category.category_name}
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
      )}

      {category && (
        <section className="pl-6 md:pl-64 pr-6 mb-20">
          <h1
            className="text-[44px] text-[#313C2B] mb-6"
            style={{ fontFamily: "sogo-light, sans-serif" }}
          >
            {category.category_name}
          </h1>
          <p
            className="text-[20px] text-[#4B5646] max-w-[1000px] leading-relaxed"
            style={{ fontFamily: "noah-regular, sans-serif" }}
            >
            {category.description}
          </p>
        </section>
      )}

      <section className="pl-6 md:pl-64 pr-6 mb-16 mt-[120px]">
        <div className="flex items-center gap-2 text-[#313C2B] text-[16px]" style={{ fontFamily: "noah-bold, sans-serif" }}>
         <LeafIcon className="w-[12px] h-[12px]" />
           explore our saunas.
        </div>
        <button onClick={() => setIsFilterOpen((prev) => !prev)} 
          className="mt-6 flex items-stretch border border-[#313C2B] rounded-md overflow-hidden text-[#313C2B] cursor-pointer"
          style={{ fontFamily: "noah-bold, sans-serif" }}>
            <span className="flex items-center justify-center bg-[#313C2B] text-[#F3F2E7] px-3 py-1.5">
              <LuSettings2 className="w-4 h-4" />
            </span>

            <span className="flex items-center justify-center bg-[#EDE9DF] px-3.5 py-2">
              Search by filter
            </span>
        </button>
        <FilterSaunas isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApplyFilter={(results) => setFilteredResults(results)} />
      </section>


      {loading && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && (
        <section className="max-w-7xl mx-auto px-6 pb-20">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {saunas.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#D8D8D8] bg-white overflow-hidden transition duration-300 hover:shadow-xl"
              >

                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.series_name}
                    className="w-full h-64 object-cover"
                  />
                )}

                <div className="p-6">

                  <h3
                    className="text-[28px] text-[#313C2B]"
                    style={{ fontFamily: "sogo-light, sans-serif" }}
                  >
                    {item.series_name}
                  </h3>

                  <p
                    className="mt-4 text-[18px] text-[#4B5646] line-clamp-3"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    {item.series_description}
                  </p>

                  <button
                    className="mt-8 w-full rounded-md border border-[#313C2B] py-3 text-[#313C2B] transition hover:bg-[#313C2B] hover:text-white"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    View Models
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {!loading && saunas.length === 0 && (
        <div
          className="py-24 text-center text-[#313C2B]"
          style={{ fontFamily: "noah-regular, sans-serif" }}
        >
          No sauna series found in this category.
        </div>
      )}

    </div>
  );
}