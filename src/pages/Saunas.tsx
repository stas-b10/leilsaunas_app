import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Saunas() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [saunas, setSaunas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaunas = async () => {
      if (!categorySlug) return;

      setLoading(true);

      const { data: category, error: catError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();

        console.log(category);

      if (catError || !category) {
        console.error(catError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("series")
        .select("*")
        .eq("category_id", category.id);

      if (error) {
        console.error(error);
      } else {
        setSaunas(data || []);
      }

      setLoading(false);
    };

    fetchSaunas();
  }, [categorySlug]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">{categorySlug}</h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-3 gap-6">
        {saunas.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}