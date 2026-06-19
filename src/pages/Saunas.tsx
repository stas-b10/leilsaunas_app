import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Saunas() {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");

  const [saunas, setSaunas] = useState<any[]>([]);

  useEffect(() => {
    const fetchSaunas = async () => {
      if (!categoryName) return;

      // 1. get category id from category_name
      const { data: category, error: catError } = await supabase
        .from("categories")
        .select("id")
        .eq("category_name", categoryName)
        .single();

      if (catError || !category) {
        console.error(catError);
        return;
      }

      // 2. get series by category_id
      const { data, error } = await supabase
        .from("series")
        .select("*")
        .eq("category_id", category.id);

      if (error) {
        console.error(error);
        return;
      }

      setSaunas(data || []);
    };

    fetchSaunas();
  }, [categoryName]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">{categoryName}</h1>

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