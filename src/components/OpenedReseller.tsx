import { useEffect, useState } from "react";
import type { Series } from "../utils/types/series";
import { supabase } from "../utils/supabase";
import type { Country } from "../utils/types/country";


interface OpenedResellerProps {
  country: Country;
  onClose: () => void;
}

export default function OpenedReseller({
  country,
  onClose,
}: OpenedResellerProps) {

  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const loadSeries = async () => {
      const { data, error } = await supabase
        .from("series")
        .select("*");

      if (error) {
        console.error("Error loading series:", error);
        return;
      }

      setSeries(data || []);
    };

    loadSeries();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">

      <div className="w-[900px] h-[600px] bg-[#f7f5ef] rounded-[8px] p-10">

        <button
          type="button"
          onClick={onClose}
          className="text-white mb-8 cursor-pointer"
        >
          Close
        </button>

        <h2
          style={{ fontFamily: "sogo-light, sans-serif" }}
          className="text-[42px] text-white"
        >
          Contact the local reseller in {country.name}
        </h2>

      </div>

    </div>
  );
}