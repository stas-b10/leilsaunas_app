import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabase";

interface FilterSaunasProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filteredResults: any[]) => void;
}

export default function FilterSaunas({
  isOpen,
  onClose,
  onApplyFilter,
}: FilterSaunasProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .order("category_name");

      const { data: collectionData } = await supabase
        .from("collections")
        .select("*")
        .order("sort_order");

      const { data: seriesData } = await supabase
        .from("series")
        .select(`
          *,
          category:categories(
            id,
            category_name
          ),
          collection:collections(
            id,
            collection_name
          )
        `);

      setCategories(categoryData || []);
      setCollections(collectionData || []);
      setSeries(seriesData || []);
    };

    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    return series.filter((item) => {
      const categoryMatch =
        !selectedCategory || item.category_id === selectedCategory.id;

      const collectionMatch =
        !selectedCollection || item.collection_id === selectedCollection.id;

      return categoryMatch && collectionMatch;
    });
  }, [series, selectedCategory, selectedCollection]);

  const handleApply = () => {
    onApplyFilter(filteredResults);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-36 right-0 w-[1020px] h-[720px] bg-[#f7f5ef] z-[9999] rounded-md shadow-2xl overflow-y-auto flex flex-col border border-[#D8D2C2]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex justify-between items-center px-4.5 py-4 border-b border-[#D8D2C2]">
            <h2
              className="text-[20px] text-[#313C2B]"
              style={{ fontFamily: "noah-bold, sans-serif" }}
            >
              View our products
            </h2>

            <button
              onClick={onClose}
              className="text-[#313C2B] text-3xl"
            >
              ×
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            <div>
              <h3
                className="text-lg mb-3 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Category
              </h3>

              <div className="flex gap-3 flex-wrap">
                {categories.map((category) => {
                  const active = selectedCategory?.id === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() =>
                        setSelectedCategory(active ? null : category)
                      }
                      className={`px-5 py-2 rounded-md border border-[#4A523F] ${
                        active
                          ? "bg-[#3D4733] text-white"
                          : "text-[#313C2B]"
                      }`}
                    >
                      {category.category_name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3
                className="text-lg mb-3 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Collection
              </h3>

              <div className="flex gap-3 flex-wrap">
                {collections.map((collection) => {
                  const active = selectedCollection?.id === collection.id;

                  return (
                    <button
                      key={collection.id}
                      onClick={() =>
                        setSelectedCollection(active ? null : collection)
                      }
                      className={`px-5 py-2 rounded-md border border-[#4A523F] ${
                        active
                          ? "bg-[#3D4733] text-white"
                          : "text-[#313C2B]"
                      }`}
                    >
                      {collection.collection_name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3
                className="text-lg mb-4 text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Series
              </h3>

              <div className="grid grid-cols-6 gap-3">
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-[#D8D2C2] p-2 bg-[#FBF9F3]"
                  >
                    <img
                      src={item.image_url}
                      alt={item.series_name}
                      className="w-full aspect-square object-cover rounded-md"
                    />

                    <p
                      className="text-center mt-2 text-[#313C2B] text-sm"
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                      {item.series_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}